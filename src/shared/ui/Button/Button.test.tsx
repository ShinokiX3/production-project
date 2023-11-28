import { render, screen } from '@testing-library/react';
import { Button, ThemeButton } from './Button';

describe('button', () => {
	test('simple text', () => {
		render(<Button>test</Button>);
		expect(screen.getByText('test')).toBeInTheDocument();
	});

	test('with clean theme', () => {
		render(<Button theme={ThemeButton.CLEAR}>test</Button>);
		expect(screen.getByText('test')).toHaveClass('clear');
		screen.debug();
	});
});
