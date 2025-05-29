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
    # Проверяем текущую ветку
    local current_branch=$(git branch --show-current)
    log_info "Текущая ветка: $current_branch"
    
    # Временно отключаем проверку ветки для тестирования
    # if [[ ! $current_branch =~ ^FEDS- ]]; then
    #     log_warn "Ветка не начинается с 'FEDS-', пропускаем проверки"
    #     exit 0
    # fi
    
    log_success "Проверка ветки пройдена"
}

# Получение новых файлов .ts/.tsx
get_new_ts_files() {
    local staged_files=$(git diff --cached --name-only --diff-filter=A)
    local new_ts_files=()
    
    while IFS= read -r file; do
        if [[ $file =~ \.(ts|tsx)$ ]] && [[ -f "$file" ]]; then
            new_ts_files+=("$file")
        fi
    done <<< "$staged_files"
    
    printf '%s\n' "${new_ts_files[@]}"
}

# Проверка, является ли файл компонентом или функцией (не просто типами)
is_component_or_function() {
    local file="$1"
    
    # Проверяем существование файла
    if [[ ! -f "$file" ]]; then
        log_error "Файл не найден: $file"
        return 1
    fi
    
    local content
    content=$(cat "$file" 2>/dev/null)
    
    if [[ -z "$content" ]]; then
        log_error "Не удалось прочитать файл: $file"
        return 1
    fi
    
    # Проверяем, содержит ли файл только типы/интерфейсы
    local only_types=true
    
    # Ищем экспорты функций, компонентов, констант, классов
    if echo "$content" | grep -qE "(export\s+(default\s+)?(function|const|class))" || \
       echo "$content" | grep -qE "export\s*\{[^}]*\}" || \
       echo "$content" | grep -qE "React\.(FC|Component|forwardRef|memo)" || \
       echo "$content" | grep -qE "memo\s*\(" || \
       echo "$content" | grep -qE "forwardRef\s*\("; then
        only_types=false
    fi
    
    # Проверяем наличие JSX/React элементов
    if echo "$content" | grep -qE "(return\s*\(.*<|return\s*<.*>)" || \
       echo "$content" | grep -qE "(<[A-Z][a-zA-Z0-9]*|<div|<span|<p\s)" || \
       echo "$content" | grep -qE "jsx|JSX"; then
        only_types=false
    fi
    
    # Проверяем на функциональные компоненты
    if echo "$content" | grep -qE "=\s*\([^)]*\)\s*=>\s*\{" || \
       echo "$content" | grep -qE "=\s*\([^)]*\)\s*=>" || \
       echo "$content" | grep -qE "function\s+[A-Z][a-zA-Z0-9]*\s*\("; then
        only_types=false
    fi
    
    # Если файл содержит только типы/интерфейсы - возвращаем false
    if $only_types; then
        return 1
    fi
    
    return 0
}

# Проверка существования тестового файла
has_test_file() {
    local file="$1"
    local dir=$(dirname "$file")
    local basename_full=$(basename "$file")
    local basename_no_ext="${basename_full%.*}"
    local extension="${basename_full##*.}"
    
    # Возможные паттерны тестовых файлов
    local test_patterns=(
        "$dir/$basename_no_ext.test.ts"
        "$dir/$basename_no_ext.test.tsx"
        "$dir/$basename_no_ext.spec.ts"
        "$dir/$basename_no_ext.spec.tsx"
        "$dir/__tests__/$basename_no_ext.test.ts"
        "$dir/__tests__/$basename_no_ext.test.tsx"
        "$dir/__tests__/$basename_no_ext.spec.ts"
        "$dir/__tests__/$basename_no_ext.spec.tsx"
    )
    
    log_info "Ищем тесты для файла: $file"
    for pattern in "${test_patterns[@]}"; do
        log_info "  Проверяем: $pattern"
        if [[ -f "$pattern" ]]; then
            log_success "  ✓ Найден тест: $pattern"
            return 0
        fi
    done
    
    log_warn "  Тесты не найдены"
    return 1
}

# Генерация тестов через новый Hugging Face Router API
generate_tests() {
    local file="$1"
    local content
    content=$(cat "$file" 2>/dev/null)
    
    if [[ -z "$content" ]]; then
        log_error "Не удалось прочитать файл: $file"
        return 1
    fi
    
    log_info "Генерируем тесты для $file..."
    
    # Подготавливаем промпт
    local prompt="Create comprehensive unit tests for this React TypeScript component using Jest and React Testing Library.

File: $(basename "$file")

Code:
\`\`\`typescript
$content
\`\`\`

Generate only the test code in Jest format with proper imports and test cases. Return only the test code without any explanations."
    
    # Пытаемся использовать новый Router API
    local response=""
    local api_success=true
    
    if command -v curl >/dev/null 2>&1; then
        # log_info "Попытка использовать Hugging Face Router API..."
        
        # ВСТАВЬТЕ ВАШ ТОКЕН СЮДА:
        local hf_token="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"  # Замените на ваш реальный токен
        
        if [[ -n "$hf_token" ]]; then
            # log_info "Используем авторизованный запрос к Hugging Face Router API"
            
            # Экранируем кавычки в промпте для JSON
            local escaped_prompt=$(echo "$prompt" | sed 's/"/\\"/g' | sed 's/$/\\n/' | tr -d '\n' | sed 's/\\n$//')
            
            response=$(timeout 60 curl -s -X POST \
                "https://router.huggingface.co/cohere/compatibility/v1/chat/completions" \
                -H "Content-Type: application/json" \
                -H "Authorization: Bearer $hf_token" \
                -d "{
                    \"messages\": [
                        {
                            \"role\": \"system\",
                            \"content\": \"You are a helpful assistant that generates unit tests for React TypeScript components. Generate only the test code without explanations.\"
                        },
                        {
                            \"role\": \"user\",
                            \"content\": \"$escaped_prompt\"
                        }
                    ],
                    \"model\": \"c4ai-aya-expanse-8b\",
                    \"max_tokens\": 1500,
                    \"temperature\": 0.1
                }" 2>/dev/null)
            
            # Проверяем успешность запроса
            if [[ -n "$response" ]] && echo "$response" | jq -e '.choices[0].message.content' >/dev/null 2>&1; then
                api_success=true
                # log_success "Router API запрос выполнен успешно"
                
                # Извлекаем содержимое ответа
                response=$(echo "$response" | jq -r '.choices[0].message.content' 2>/dev/null)
            else
                log_warn "Router API недоступен или вернул ошибку"
                if [[ -n "$response" ]]; then
                    echo ""
                    # log_error "Ответ API: $response"
                fi
            fi
        else
            log_warn "Токен не найден, пропускаем API запрос"
        fi
    fi
    
    # Если API не работает, создаем базовый шаблон
    if [[ "$api_success" != true ]]; then
        log_info "Создаем базовый шаблон теста..."
        response=$(create_basic_test_template "$file" "$content")
    fi
    
    # echo "$response"
}

# Создание базового шаблона теста
create_basic_test_template() {
    local file="$1"
    local content="$2"
    local basename_no_ext=$(basename "$file" | sed 's/\.[^.]*$//')
    
    # Извлекаем имя экспортируемого компонента
    local component_name
    component_name=$(echo "$content" | grep -oE "export\s+(const|default)\s+[A-Z][a-zA-Z0-9]*" | head -1 | sed 's/export\s\+\(const\|default\)\s\+//')
    
    if [[ -z "$component_name" ]]; then
        component_name="$basename_no_ext"
    fi
    
    cat << EOF
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { $component_name } from './$basename_no_ext';

describe('$component_name', () => {
  it('should render without crashing', () => {
    render(<$component_name />);
    expect(document.body).toBeInTheDocument();
  });

  it('should render with provided props', () => {
    const testProps = {
      className: 'test-class',
      'data-testid': 'test-component'
    };
    
    render(<$component_name {...testProps} />);
    const element = screen.getByTestId('test-component');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('test-class');
  });

  // TODO: Add more specific tests based on component functionality
  it('should handle user interactions', () => {
    // Add interaction tests here
    expect(true).toBe(true);
  });
});
EOF
}

# Создание тестового файла
create_test_file() {
    local original_file="$1"
    local test_content="$2"
    
    local dir=$(dirname "$original_file")
    local basename_full=$(basename "$original_file")
    local basename_no_ext="${basename_full%.*}"
    local extension="${basename_full##*.}"
    
    # Определяем путь для тестового файла
    local test_file="$dir/$basename_no_ext.test.$extension"
    
    # Создаем директорию __tests__ если файл в корне компонента
    if [[ "$dir" == *"/Component"* ]] || [[ "$dir" == *"/component"* ]]; then
        if [[ ! -d "$dir/__tests__" ]]; then
            mkdir -p "$dir/__tests__"
        fi
        test_file="$dir/__tests__/$basename_no_ext.test.$extension"
    fi
    
    # Используем содержимое напрямую, так как API уже возвращает готовый код
    local parsed_content="$test_content"
    
    # Если содержимое пустое, используем базовый шаблон
    if [[ -z "$parsed_content" ]] || [[ "$parsed_content" == "null" ]]; then
        log_warn "Пустой ответ от генератора, используем базовый шаблон"
        parsed_content=$(create_basic_test_template "$original_file" "$(cat "$original_file")")
    fi
    
    # Записываем тест в файл
    echo "$parsed_content" > "$test_file"
    
    log_success "Создан тестовый файл: $test_file"
    
    # Показываем превью созданного теста
    log_info "Превью созданного теста:"
    echo -e "${YELLOW}$(head -15 "$test_file")${NC}"
    if [[ $(wc -l < "$test_file") -gt 15 ]]; then
        echo -e "${YELLOW}... (остальное в файле)${NC}"
    fi
    
    # Пытаемся открыть в IDE
    if command -v code &> /dev/null; then
        code "$test_file" 2>/dev/null &
        log_info "Попытка открыть файл в VS Code"
    elif command -v atom &> /dev/null; then
        atom "$test_file" 2>/dev/null &
        log_info "Попытка открыть файл в Atom"
    fi
    
    echo "$test_file"
}

# Основная логика
main() {
    log_info "Запуск Husky pre-commit hook..."
    
    # 1. Проверяем ветку
    check_branch
    
    # 2. Получаем новые .ts/.tsx файлы
    local new_files_raw
    new_files_raw=$(get_new_ts_files)
    
    if [[ -z "$new_files_raw" ]]; then
        log_info "Новые TypeScript файлы не найдены, пропускаем"
        exit 0
    fi
    
    # Преобразуем в массив, корректно обрабатывая файлы с пробелами
    local new_files=()
    while IFS= read -r file; do
        if [[ -n "$file" ]]; then
            new_files+=("$file")
        fi
    done <<< "$new_files_raw"
    
    log_info "Найдены новые TypeScript файлы:"
    for file in "${new_files[@]}"; do
        log_info "  - $file"
    done
    
    # 3. Фильтруем только компоненты и функции
    local component_files=()
    for file in "${new_files[@]}"; do
        log_info "Анализируем файл: $file"
        if is_component_or_function "$file"; then
            component_files+=("$file")
            log_success "  ✓ Файл содержит компонент/функцию"
        else
            log_info "  - Файл содержит только типы, пропускаем"
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
    
    # 5. Автоматически создаем тесты для файлов без тестов
    log_info "Следующие файлы не имеют тестов, создаем автоматически:"
    for file in "${files_without_tests[@]}"; do
        echo "  - $file"
    done
    
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