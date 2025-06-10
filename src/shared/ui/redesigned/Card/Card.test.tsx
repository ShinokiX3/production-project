import React from 'react';
import { render } from '@testing-library/react';
import { Card, CardVariant, CardPadding, CardBorder } from './Card';
import cls from './Card.module.scss';

describe('Card', () => {
    const getCard = (props = {}) =>
        render(<Card {...props}>Test content</Card>);

    it('renders children correctly', () => {
        const { getByText } = getCard();
        expect(getByText('Test content')).toBeInTheDocument();
    });

    it('applies default props correctly', () => {
        const { container } = getCard();
        const div = container.firstChild as HTMLDivElement;

        expect(div.className).toContain(cls.Card);
        expect(div.className).toContain(cls.normal); // default variant
        expect(div.className).toContain(cls.default); // default border
        expect(div.className).toContain(cls.p8); // default padding
    });

    it('applies custom className', () => {
        const { container } = getCard({ className: 'custom-class' });
        const div = container.firstChild as HTMLDivElement;
        expect(div.className).toContain('custom-class');
    });

    it('applies full and screen modifiers', () => {
        const { container } = getCard({ full: true, screen: true });
        const div = container.firstChild as HTMLDivElement;
        expect(div.className).toContain(cls.full);
        expect(div.className).toContain(cls.screen);
    });

    it.each<CardVariant>(['normal', 'outlined', 'light'])(
        'applies variant class: %s',
        (variant) => {
            const { container } = getCard({ variant });
            expect(container.firstChild).toHaveClass(cls[variant]);
        },
    );

    it.each<CardPadding>(['0', '8', '16', '24'])(
        'applies padding class: %s',
        (padding) => {
            const { container } = getCard({ padding });
            expect(container.firstChild).toHaveClass(cls[`p${padding}`]);
        },
    );

    it.each<CardBorder>(['round', 'partial', 'default'])(
        'applies border class: %s',
        (border) => {
            const { container } = getCard({ border });
            expect(container.firstChild).toHaveClass(cls[border]);
        },
    );

    it('spreads other props onto the div', () => {
        const { container } = getCard({ 'data-testid': 'card' });
        expect(container.firstChild).toHaveAttribute('data-testid', 'card');
    });
});
