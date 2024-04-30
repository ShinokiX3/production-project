import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './Button.module.scss';

export enum ThemeButton {
	CLEAR = 'clear',
	CLEAR_INVERTED = 'clear_inverted',
	OUTLINE = 'outline',
	OUTLINE_RED = 'outline_red',
	BACKGROUND = 'background',
	BACKGROUND_INVERTED = 'background_inverted',
}

export enum SizeButton {
	M = 'size_m',
	L = 'size_l',
	XL = 'size_xl',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	theme?: ThemeButton;
	square?: boolean;
	size?: SizeButton;
	disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = memo((props) => {
	const {
		className, children, theme = ThemeButton.OUTLINE, square, size = SizeButton.M, disabled, ...otherProps
	} = props;

	const mods: Mods = {
		[cls.square]: square,
		[cls.disabled]: disabled,
	};

	return (
		<button
			type="button"
			className={classNames(cls.Button, mods, [className, cls[theme], cls[size]])}
			disabled={disabled}
			{...otherProps}
		>
			{children}
		</button>
	);
});
