import { memo } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ThemeButton = 'clear' | 'outline' | 'filled';
export type ColorButton = 'normal' | 'success' | 'error';
export type SizeButton = 'm' | 'l' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ThemeButton;
    square?: boolean;
    size?: SizeButton;
    disabled?: boolean;
    full?: boolean;
    color?: ColorButton;
    addonLeft?: React.ReactNode;
    addonRight?: React.ReactNode;
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
        color = 'normal',
        addonLeft,
        addonRight,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.full]: full,
        [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [
                className,
                cls[variant],
                cls[size],
                cls[color],
            ])}
            disabled={disabled}
            {...otherProps}
        >
            <div className={cls.addonLeft}>{addonLeft}</div>
            {children}
            <div className={cls.addonRight}>{addonRight}</div>
        </button>
    );
});
