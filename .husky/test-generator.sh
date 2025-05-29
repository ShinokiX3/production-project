#!/bin/bash

# Husky Pre-Commit Hook для автоматической генерации тестов
# Требует: Node.js, Yarn, Jest, Hugging Face API

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Логирование
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Проверка текущей ветки
check_branch() {
    local current_branch=$(git branch --show-current)
    log_info "Текущая ветка: $current_branch"
    
    if [[ ! $current_branch =~ ^FEDS- ]]; then
        log_warn "Ветка не начинается с 'FEDS-', пропускаем проверки"
        exit 0
    fi
    
    log_success "Ветка соответствует требованиям"
}

# Получение новых файлов .ts/.tsx
get_new_ts_files() {
    local staged_files=$(git diff --cached --name-only --diff-filter=A)
    local new_ts_files=()
    
    while IFS= read -r file; do
        if [[ $file =~ \.(ts|tsx)$ ]] && [[ -f $file ]]; then
            new_ts_files+=("$file")
        fi
    done <<< "$staged_files"
    
    echo "${new_ts_files[@]}"
}

# Проверка, является ли файл компонентом или функцией (не просто типами)
is_component_or_function() {
    local file="$1"
    local content=$(cat "$file")
    
    # Проверяем наличие экспорта функций, компонентов, классов
    if echo "$content" | grep -qE "(export\s+(default\s+)?(function|const|class)|export\s+\{|React\.FC|React\.Component|\.forwardRef\()" && \
       ! echo "$content" | grep -qE "^(export\s+)?(type|interface)\s+\w+"; then
        return 0
    fi
    
    # Дополнительная проверка на React компоненты
    if echo "$content" | grep -qE "(return\s*\(.*<|return\s*<|\}\s*\)\s*$)" && \
       echo "$content" | grep -qE "(React|JSX)"; then
        return 0
    fi
    
    return 1
}

# Проверка существования тестового файла
has_test_file() {
    local file="$1"
    local dir=$(dirname "$file")
    local basename=$(basename "$file" | sed 's/\.[^.]*$//')
    
    # Возможные паттерны тестовых файлов
    local test_patterns=(
        "$dir/$basename.test.ts"
        "$dir/$basename.test.tsx"
        "$dir/$basename.spec.ts"
        "$dir/$basename.spec.tsx"
        "$dir/__tests__/$basename.test.ts"
        "$dir/__tests__/$basename.test.tsx"
    )
    
    for pattern in "${test_patterns[@]}"; do
        if [[ -f "$pattern" ]]; then
            return 0
        fi
    done
    
    return 1
}

# Генерация тестов через Hugging Face API
generate_tests() {
    local file="$1"
    local content=$(cat "$file")
    
    log_info "Генерируем тесты для $file..."
    
    # Подготавливаем промпт
    local prompt="Create comprehensive, very good quality unit tests for this React Native TypeScript function/component using Jest. 

File: $file

Code:
\`\`\`typescript
$content
\`\`\`

Please provide only the test code without explanations, formatted as a complete Jest test file."
    
    # API запрос к Hugging Face (используем бесплатную модель)
    local response=$(curl -s -X POST \
        "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium" \
        -H "Content-Type: application/json" \
        -d "{
            \"inputs\": \"$prompt\",
            \"parameters\": {
                \"max_length\": 2000,
                \"temperature\": 0.7,
                \"do_sample\": true
            }
        }")
    
    # Альтернативный запрос к более подходящей модели для кода
    if [[ -z "$response" ]] || echo "$response" | grep -q "error"; then
        response=$(curl -s -X POST \
            "https://api-inference.huggingface.co/models/bigcode/starcoder" \
            -H "Content-Type: application/json" \
            -d "{
                \"inputs\": \"$prompt\",
                \"parameters\": {
                    \"max_new_tokens\": 1000,
                    \"temperature\": 0.1
                }
            }")
    fi
    
    echo "$response"
}

# Создание тестового файла
create_test_file() {
    local original_file="$1"
    local test_content="$2"
    
    local dir=$(dirname "$original_file")
    local basename=$(basename "$original_file" | sed 's/\.[^.]*$//')
    local extension="${original_file##*.}"
    
    # Определяем путь для тестового файла
    local test_file="$dir/$basename.test.$extension"
    
    # Создаем директорию __tests__ если нужно
    if [[ ! -d "$dir/__tests__" ]]; then
        mkdir -p "$dir/__tests__"
        test_file="$dir/__tests__/$basename.test.$extension"
    fi
    
    # Парсим ответ от LLM и извлекаем код тестов
    local parsed_content=$(echo "$test_content" | jq -r '.generated_text // .choices[0].text // .' 2>/dev/null || echo "$test_content")
    
    # Базовый шаблон если LLM не вернул корректный ответ
    if [[ -z "$parsed_content" ]] || [[ "$parsed_content" == "null" ]]; then
        parsed_content="import { render, screen } from '@testing-library/react-native';
import { $(basename "$original_file" .${extension}) } from '../$(basename "$original_file")';

describe('$(basename "$original_file" .${extension})', () => {
  it('should render correctly', () => {
    // TODO: Add your test implementation
    expect(true).toBe(true);
  });
  
  // TODO: Add more comprehensive tests
});"
    fi
    
    # Записываем тест в файл
    echo "$parsed_content" > "$test_file"
    
    log_success "Создан тестовый файл: $test_file"
    
    # Пытаемся открыть в IDE
    if command -v code &> /dev/null; then
        code "$test_file"
        log_info "Файл открыт в VS Code"
    elif command -v atom &> /dev/null; then
        atom "$test_file"
        log_info "Файл открыт в Atom"
    else
        log_info "Тестовый файл создан: $test_file"
        log_info "Содержимое файла:"
        echo -e "${YELLOW}$(head -20 "$test_file")${NC}"
    fi
    
    echo "$test_file"
}

# Основная логика
main() {
    log_info "Запуск Husky pre-commit hook..."
    
    # 1. Проверяем ветку
    check_branch
    
    # 2. Получаем новые .ts/.tsx файлы
    local new_files=($(get_new_ts_files))
    
    if [[ ${#new_files[@]} -eq 0 ]]; then
        log_info "Новые TypeScript файлы не найдены, пропускаем"
        exit 0
    fi
    
    log_info "Найдены новые TypeScript файлы: ${new_files[*]}"
    
    # 3. Фильтруем только компоненты и функции
    local component_files=()
    for file in "${new_files[@]}"; do
        if is_component_or_function "$file"; then
            component_files+=("$file")
        else
            log_info "Файл $file содержит только типы, пропускаем"
        fi
    done
    
    if [[ ${#component_files[@]} -eq 0 ]]; then
        log_info "Новые компоненты/функции не найдены, пропускаем"
        exit 0
    fi
    
    # 4. Проверяем наличие тестов
    local files_without_tests=()
    for file in "${component_files[@]}"; do
        if ! has_test_file "$file"; then
            files_without_tests+=("$file")
        fi
    done
    
    if [[ ${#files_without_tests[@]} -eq 0 ]]; then
        log_success "Все компоненты/функции имеют тесты"
        exit 0
    fi
    
    # 5. Спрашиваем у разработчика
    log_warn "Следующие файлы не имеют тестов:"
    for file in "${files_without_tests[@]}"; do
        echo "  - $file"
    done
    
    echo -n -e "${YELLOW}Хотите создать тесты для новых компонентов? (y/n): ${NC}"
    read -r answer
    
    if [[ ! "$answer" =~ ^[Yy]$ ]]; then
        log_info "Создание тестов отменено, пропускаем коммит"
        exit 0
    fi
    
    # 6. Генерируем тесты
    local created_tests=()
    for file in "${files_without_tests[@]}"; do
        log_info "Обработка файла: $file"
        
        local test_content=$(generate_tests "$file")
        local test_file=$(create_test_file "$file" "$test_content")
        
        if [[ -f "$test_file" ]]; then
            created_tests+=("$test_file")
            # Добавляем тестовый файл в git
            git add "$test_file"
        fi
    done
    
    # 7. Если тесты созданы - блокируем коммит
    if [[ ${#created_tests[@]} -gt 0 ]]; then
        log_success "Созданы тестовые файлы:"
        for test in "${created_tests[@]}"; do
            echo "  - $test"
        done
        
        log_warn "Коммит заблокирован! Проверьте созданные тесты и выполните коммит повторно."
        log_info "Тестовые файлы добавлены в staging area."
        
        exit 1
    fi
    
    log_success "Все проверки пройдены!"
}

# Запускаем основную функцию
main "$@"