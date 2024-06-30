import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('button', () => {
    test('simple text', () => {
        render(<Button>test</Button>);
        expect(screen.getByText('test')).toBeInTheDocument();
    });

    test('with clean theme', () => {
        render(<Button variant="clear">test</Button>);
        expect(screen.getByText('test')).toHaveClass('clear');
        screen.debug();
    });
});
