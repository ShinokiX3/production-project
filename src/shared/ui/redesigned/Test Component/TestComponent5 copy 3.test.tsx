[0;34m[INFO][0m Генерируем тесты для src/shared/ui/redesigned/Test Component/TestComponent5 copy 3.tsx...
[0;34m[INFO][0m Попытка использовать Hugging Face Router API...
[0;34m[INFO][0m Используем авторизованный запрос к Hugging Face Router API
[1;33m[WARN][0m Router API недоступен или вернул ошибку
[0;31m[ERROR][0m Ответ API: {"id":"59340fb2-fbd2-4d97-bd87-623f8be2b05b","choices":[{"index":0,"finish_reason":"stop","message":{"role":"assistant","content":"```typescript
import { render, screen, getByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestComponentZ } from './TestComponent5.tsx';

describe('TestComponentZ', () => {
  test('renders with default props', () => {
    render(<TestComponentZ text=\"Default Text\" />);
    expect(screen.getByText('Default Text')).toBeInTheDocument();
  });

  test('renders with title', () => {
    render(<TestComponentZ title=\"Test Title\" text=\"Default Text\" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('applies correct variant class', () => {
    render(<TestComponentZ variant=\"accent\" />);
    expect(screen.getByTestId('Text.Header')).toHaveClass('accent');
  });

  test('applies correct align class', () => {
    render(<TestComponentZ align=\"right\" />);
    expect(screen.getByTestId('Text')).toHaveClass('right');
  });

  test('applies correct size class', () => {
    render(<TestComponentZ size=\"xl\" />);
    expect(screen.getByTestId('Text')).toHaveClass('size_l');
  });

  test('applies bold class when bold prop is true', () => {
    render(<TestComponentZ bold />);
    expect(screen.getByTestId('Text')).toHaveClass('bold');
  });

  test('handles data-testid prop', () => {
    render(<TestComponentZ data-testid=\"custom-id\" />);
    expect(screen.getByTestId('custom-id')).toBeInTheDocument();
  });

  test('renders with different header tags based on size', () => {
    render(<TestComponentZ size=\"s\" title=\"Small Header\" />);
    expect(screen.getByText('Small Header')).toHaveClass('h3');

    render(<TestComponentZ size=\"l\" title=\"Large Header\" />);
    expect(screen.getByText('Large Header')).toHaveClass('h1');
  });
});
```"}}],"created":1748554225,"model":"c4ai-aya-expanse-8b","object":"chat.completion","usage":{"prompt_tokens":594,"completion_tokens":439,"total_tokens":1033}}
[0;34m[INFO][0m Создаем базовый шаблон теста...
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestComponentZ } from './TestComponent5 copy 3';

describe('TestComponentZ', () => {
  it('should render without crashing', () => {
    render(<TestComponentZ />);
    expect(document.body).toBeInTheDocument();
  });

  it('should render with provided props', () => {
    const testProps = {
      className: 'test-class',
      'data-testid': 'test-component'
    };
    
    render(<TestComponentZ {...testProps} />);
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
