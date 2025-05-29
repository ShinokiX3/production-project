[0;34m[INFO][0m Генерируем тесты для src/shared/ui/redesigned/Test Component/TestComponent5 copy.tsx...
[0;34m[INFO][0m Попытка использовать Hugging Face Router API...
[0;34m[INFO][0m Используем авторизованный запрос к Hugging Face Router API
[1;33m[WARN][0m Router API недоступен или вернул ошибку
[0;31m[ERROR][0m Ответ API: {"id":"e31444c5-c6e9-4485-b75a-e9579d0761e7","choices":[{"index":0,"finish_reason":"stop","message":{"role":"assistant","content":"```typescript
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
```"}}],"created":1748556410,"model":"c4ai-aya-expanse-8b","object":"chat.completion","usage":{"prompt_tokens":592,"completion_tokens":413,"total_tokens":1005}}
{"id":"e31444c5-c6e9-4485-b75a-e9579d0761e7","choices":[{"index":0,"finish_reason":"stop","message":{"role":"assistant","content":"```typescript\nimport { render, screen, getByTestId } from '@testing-library/react';\nimport userEvent from '@testing-library/user-event';\nimport { TestComponentZ } from './TestComponent5.tsx';\n\ndescribe('TestComponentZ', () =\u003e {\n  test('renders with default props', () =\u003e {\n    render(\u003cTestComponentZ text=\"Default Text\" /\u003e);\n    expect(screen.getByText('Default Text')).toBeInTheDocument();\n  });\n\n  test('renders with title', () =\u003e {\n    render(\u003cTestComponentZ title=\"Test Title\" text=\"Default Text\" /\u003e);\n    expect(screen.getByText('Test Title')).toBeInTheDocument();\n  });\n\n  test('applies correct variant class', () =\u003e {\n    render(\u003cTestComponentZ variant=\"accent\" /\u003e);\n    expect(screen.getByText('Default Text')).toHaveClass('cls-accent');\n  });\n\n  test('applies correct align class', () =\u003e {\n    render(\u003cTestComponentZ align=\"right\" /\u003e);\n    expect(screen.getByText('Default Text')).toHaveClass('cls-right');\n  });\n\n  test('applies correct size class', () =\u003e {\n    render(\u003cTestComponentZ size=\"xl\" /\u003e);\n    expect(screen.getByText('Default Text')).toHaveClass('size_xl');\n  });\n\n  test('applies bold class when bold prop is true', () =\u003e {\n    render(\u003cTestComponentZ bold /\u003e);\n    expect(screen.getByText('Default Text')).toHaveClass('cls-bold');\n  });\n\n  test('renders with custom data-testid', () =\u003e {\n    render(\u003cTestComponentZ data-testid=\"custom-id\" /\u003e);\n    expect(getByTestId('custom-id')).toBeInTheDocument();\n  });\n\n  test('handles user interaction', () =\u003e {\n    const user = userEvent.setup();\n    render(\u003cTestComponentZ /\u003e);\n    user.click(screen.getByText('Default Text'));\n    // Add assertions for user interaction as needed\n  });\n});\n```"}}],"created":1748556410,"model":"c4ai-aya-expanse-8b","object":"chat.completion","usage":{"prompt_tokens":592,"completion_tokens":413,"total_tokens":1005}}
