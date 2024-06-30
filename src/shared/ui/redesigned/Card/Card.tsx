import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorder = 'round' | 'default';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: React.ReactNode;
    variant?: CardVariant;
    full?: boolean;
    padding?: CardPadding;
    border?: CardBorder;
}

export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        variant = 'normal',
        full = false,
        padding = '8',
        border = 'default',
        ...otherProps
    } = props;

    const mods = {
        [cls.full]: full,
    };

    const mapPaddingToClass: Record<CardPadding, string> = {
        '0': cls.p0,
        '8': cls.p8,
        '16': cls.p16,
        '24': cls.p24,
    };

    const additional = [
        className,
        mapPaddingToClass[padding],
        cls[variant],
        cls[border],
    ];

    return (
        <div className={classNames(cls.Card, mods, additional)} {...otherProps}>
            {children}
        </div>
    );
});
