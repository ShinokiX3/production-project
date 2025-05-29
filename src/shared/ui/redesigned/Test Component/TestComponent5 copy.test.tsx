[0;34m[INFO][0m Генерируем тесты для src/shared/ui/redesigned/Test Component/TestComponent5 copy.tsx...
[0;34m[INFO][0m Попытка использовать Hugging Face Router API...
[0;34m[INFO][0m Используем авторизованный запрос к Hugging Face Router API
[1;33m[WARN][0m Router API недоступен или вернул ошибку
[0;31m[ERROR][0m Ответ API: {"id":"133c86dd-60b3-4182-8d75-0d9c0404b778","choices":[{"index":0,"finish_reason":"stop","message":{"role":"assistant","content":"```typescript
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
    expect(screen.getByText('Default Text')).toHaveClass('cls-accent');
  });

  test('applies correct align class', () => {
    render(<TestComponentZ align=\"right\" />);
    expect(screen.getByText('Default Text')).toHaveClass('cls-right');
  });

  test('applies correct size class', () => {
    render(<TestComponentZ size=\"xl\" />);
    expect(screen.getByText('Default Text')).toHaveClass('size_xl');
  });

  test('applies bold class when bold prop is true', () => {
    render(<TestComponentZ bold />);
    expect(screen.getByText('Default Text')).toHaveClass('cls-bold');
  });

  test('renders with custom data-testid', () => {
    render(<TestComponentZ data-testid=\"custom-id\" />);
    expect(getByTestId('custom-id')).toBeInTheDocument();
  });

  test('handles user interaction', () => {
    const user = userEvent.setup();
    render(<TestComponentZ />);
    user.click(screen.getByText('Default Text'));
    // Add assertions for user interaction as needed
  });
});
```"}}],"created":1748554727,"model":"c4ai-aya-expanse-8b","object":"chat.completion","usage":{"prompt_tokens":592,"completion_tokens":413,"total_tokens":1005}}
[0;34m[INFO][0m Создаем базовый шаблон теста...
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestComponentZ } from './TestComponent5 copy';

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
