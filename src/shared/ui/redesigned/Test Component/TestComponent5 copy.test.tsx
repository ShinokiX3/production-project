[0;31m[ERROR][0m Ответ API: {"id":"48168e0c-1ad8-4609-9cbd-619c5c5ee0e7","choices":[{"index":0,"finish_reason":"stop","message":{"role":"assistant","content":"```typescript
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
```"}}],"created":1748556726,"model":"c4ai-aya-expanse-8b","object":"chat.completion","usage":{"prompt_tokens":592,"completion_tokens":413,"total_tokens":1005}}
