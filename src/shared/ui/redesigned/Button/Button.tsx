import { memo } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ThemeButton = 'clear' | 'outline' | 'filled';
export type SizeButton = 'm' | 'l' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ThemeButton;
    square?: boolean;
    size?: SizeButton;
    disabled?: boolean;
    full?: boolean;
}

export const Button: React.FC<ButtonProps> = memo((props) => {
    const {
        children,
        className,
        variant = 'outline',
        size = 'm',
        square,
        disabled,
        full,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.full]: full,
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [
                className,
                cls[variant],
                cls[size],
            ])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
});
