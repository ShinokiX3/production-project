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
    
    local only_types=true
    
    if echo "$content" | grep -qE "(export\s+(default\s+)?(function|const|class))" || \
       echo "$content" | grep -qE "export\s*\{[^}]*\}" || \
       echo "$content" | grep -qE "React\.(FC|Component|forwardRef|memo)" || \
       echo "$content" | grep -qE "memo\s*\(" || \
       echo "$content" | grep -qE "forwardRef\s*\("; then
        only_types=false
    fi
    
    if echo "$content" | grep -qE "(return\s*\(.*<|return\s*<.*>)" || \
       echo "$content" | grep -qE "(<[A-Z][a-zA-Z0-9]*|<div|<span|<p\s)" || \
       echo "$content" | grep -qE "jsx|JSX"; then
        only_types=false
    fi
    
    if echo "$content" | grep -qE "=\s*\([^)]*\)\s*=>\s*\{" || \
       echo "$content" | grep -qE "=\s*\([^)]*\)\s*=>" || \
       echo "$content" | grep -qE "function\s+[A-Z][a-zA-Z0-9]*\s*\("; then
        only_types=false
    fi
    
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

# Очистка ответа от лишнего текста
clean_api_response() {
    local raw_response="$1"
    
    log_info "Очищаем ответ API..."
    
    # Извлекаем содержимое из JSON ответа
    local cleaned_response=$(echo "$raw_response" | jq -r '.choices[0].message.content' 2>/dev/null)
    
    # Если jq не смог извлечь содержимое, возвращаем исходный ответ
    if [[ -z "$cleaned_response" ]] || [[ "$cleaned_response" == "null" ]]; then
        log_warn "Не удалось извлечь содержимое из ответа API"
        cleaned_response="$raw_response"
    fi
    
    # Удаляем <think> теги, если они есть
    cleaned_response=$(echo "$cleaned_response" | sed 's/<think>.*<\/think>//g' | sed 's/<think>.*//g')
    
    # Удаляем маркеры кода ```, если они есть
    if echo "$cleaned_response" | grep -q '```'; then
        cleaned_response=$(echo "$cleaned_response" | sed -n '/```typescript/,/```/p; /```jsx/,/```/p; /```javascript/,/```/p; /```/,/```/p' | sed '1d;$d' | head -n -1)
    fi
    
    # Удаляем пустые строки в начале и конце
    cleaned_response=$(echo "$cleaned_response" | sed '/^$/d' | sed -e :a -e '/^\s*$/d;N;ba')
    
    log_info "Очищенный ответ (первые 200 символов): $(echo "$cleaned_response" | head -c 200)..."
    
    echo "$cleaned_response"
}

# Генерация тестов через Hugging Face Router API
generate_tests() {
    local file="$1"
    local content
    content=$(cat "$file" 2>/dev/null)
    
    if [[ -z "$content" ]]; then
        log_error "Не удалось прочитать файл: $file"
        return 1
    fi
    
    log_info "Генерируем тесты для $file..."
    
    local prompt="Generate ONLY unit test code for this React TypeScript component. No explanations, no comments outside the code.

Component code:
\`\`\`typescript
$content
\`\`\`

Requirements:
- Use Jest and React Testing Library
- Start with imports
- Include describe block with component name
- Test rendering and basic functionality
- Return ONLY the test code, nothing else"
    
    local response=""
    local api_success=false
    
    if command -v curl >/dev/null 2>&1; then
        log_info "Попытка использовать Hugging Face Router API..."
        
        local hf_token="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"  # Замените на ваш реальный токен
        
        if [[ -n "$hf_token" ]]; then
            log_info "Используем авторизованный запрос к Hugging Face Router API"
            
            local escaped_prompt=$(echo "$prompt" | sed 's/"/\\"/g' | sed 's/$/\\n/' | tr -d '\n' | sed 's/\\n$//')
            
            response=$(timeout 120 curl -s -w "%{http_code}" \
                "https://router.huggingface.co/cerebras/v1/chat/completions" \
                -H "Content-Type: application/json" \
                -H "Authorization: Bearer $hf_token" \
                -d "{
                    \"messages\": [
                        {
                            \"role\": \"system\",
                            \"content\": \"You are a code generator. Generate ONLY test code without any explanations or markdown. Start directly with imports.\"
                        },
                        {
                            \"role\": \"user\",
                            \"content\": \"$escaped_prompt\"
                        }
                    ],
                    \"model\": \"qwen-3-32b\",
                    \"max_tokens\": 30000,
                    \"temperature\": 0.05
                }" 2>/dev/null)
            
            http_status=${response: -3}
            response=${response%???}
            
            if [[ "$http_status" -ne 200 ]]; then
                log_error "API вернул статус $http_status"
                log_info "Ответ: $(echo "$response" | head -c 200)..."
                response=$(create_basic_test_template "$file" "$content")
            elif [[ -n "$response" ]] && echo "$response" | jq -e '.choices[0].message.content' >/dev/null 2>&1; then
                log_success "Router API запрос выполнен успешно"
                echo "$response" > "/tmp/api_response_$(basename "$file").json"
                log_info "Ответ API сохранен в /tmp/api_response_$(basename "$file").json"
                
                local raw_content=$(echo "$response" | jq -r '.choices[0].message.content' 2>/dev/null)
                response=$(clean_api_response "$raw_content")
                
                if [[ -n "$response" ]] && [[ ${#response} -gt 100 ]] && (echo "$response" | grep -q "import\|describe"); then
                    api_success=true
                    log_success "Получен качественный ответ от API"
                else
                    log_warn "Очищенный ответ некачественный или слишком короткий (${#response} символов)"
                    response=$(create_basic_test_template "$file" "$content")
                fi
            else
                log_warn "Router API недоступен или вернул ошибку"
                response=$(create_basic_test_template "$file" "$content")
            fi
        else
            log_warn "Токен не найден, используем базовый шаблон"
            response=$(create_basic_test_template "$file" "$content")
        fi
    else
        log_error "curl не установлен, используем базовый шаблон"
        response=$(create_basic_test_template "$file" "$content")
    fi
    
    echo "$response"
}

# Создание базового шаблона теста
create_basic_test_template() {
    local file="$1"
    local content="$2"
    local basename_no_ext=$(basename "$file" | sed 's/\.[^.]*$//')
    
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
    
    local test_file="$dir/$basename_no_ext.test.$extension"
    
    if [[ "$dir" == *"/Component"* ]] || [[ "$dir" == *"/component"* ]]; then
        if [[ ! -d "$dir/__tests__" ]]; then
            mkdir -p "$dir/__tests__"
        fi
        test_file="$dir/__tests__/$basename_no_ext.test.$extension"
    fi
    
    local parsed_content="$test_content"
    
    if [[ -z "$parsed_content" ]] || [[ "$parsed_content" == "null" ]]; then
        log_warn "Пустой ответ от генератора, используем базовый шаблон"
        parsed_content=$(create_basic_test_template "$original_file" "$(cat "$original_file")")
    fi
    
    echo "$parsed_content" > "$test_file"
    
    log_success "Создан тестовый файл: $test_file"
    
    log_info "Превью созданного теста:"
    echo -e "${YELLOW}$(head -15 "$test_file")${NC}"
    if [[ $(wc -l < "$test_file") -gt 15 ]]; then
        echo -e "${YELLOW}... (остальное в файле)${NC}"
    fi
    
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
    
    check_branch
    
    local new_files_raw
    new_files_raw=$(get_new_ts_files)
    
    if [[ -z "$new_files_raw" ]]; then
        log_info "Новые TypeScript файлы не найдены, пропускаем"
        exit 0
    fi
    
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
    
    log_info "Следующие файлы не имеют тестов, создаем автоматически:"
    for file in "${files_without_tests[@]}"; do
        echo "  - $file"
    done
    
    local created_tests=()
    for file in "${files_without_tests[@]}"; do
        log_info "Обработка файла: $file"
        
        local test_content=$(generate_tests "$file")
        local test_file=$(create_test_file "$file" "$test_content")
        
        if [[ -f "$test_file" ]]; then
            created_tests+=("$test_file")
            git add "$test_file"
        fi
    done
    
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