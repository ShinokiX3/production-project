import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

export enum TextAlign {
	RIGHT = 'right',
	LEFT = 'left',
	CENTER = 'center',
}

export enum TextSize {
	M = 'm_size',
	L = 'l_size'
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
	align?: TextAlign;
	size?: TextSize;
}

export const Text = memo((props: TextProps) => {
	const {
		className,
		text,
		title,
		theme = TextTheme.PRIMARY,
		align = TextAlign.LEFT,
		size = TextSize.M
	} = props;

	const mods: Mods = {
		[cls[theme]]: true,
		[cls[align]]: true,
		[cls[size]]: true,
	};

	return (
		<div className={classNames(cls.Text, mods, [className, cls[theme]])}>
			{title ? <p className={cls.title}>{title}</p> : null}
			{text ? <p className={cls.text}>{text}</p> : null}
		</div>
	);
});
