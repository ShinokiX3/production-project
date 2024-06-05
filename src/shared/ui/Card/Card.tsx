import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
	NORMAL = 'normal',
	OUTLINED = 'outlined'
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: React.ReactNode;
	theme?: CardTheme;
}

export const Card = memo((props: CardProps) => {
	const {
		className,
		children,
		theme = CardTheme.NORMAL,
		...otherProps
	} = props;

	return (
		<div className={classNames(cls.Card, {}, [className, cls[theme]])} {...otherProps}>
			{children}
		</div>
	);
});
