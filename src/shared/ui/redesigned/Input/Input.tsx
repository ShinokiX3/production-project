import { MutableRefObject, memo, useEffect, useRef, useState } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import { HStack } from '../Stack';
import { Text } from '../Text';

type HTMLInputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readonly' | 'size'
>;

type InputSize = 's' | 'm' | 'l';

interface InputProps extends HTMLInputProps {
    className?: string;
    type?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    placeholder?: string;
    autofocus?: boolean;
    readonly?: boolean;
    addonLeft?: React.ReactNode;
    addonRight?: React.ReactNode;
    label?: string;
    size?: InputSize;
    'data-testid'?: string;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        type = 'text',
        value,
        onChange,
        placeholder,
        autofocus,
        readonly,
        addonLeft,
        addonRight,
        label,
        size = 'm',
        'data-testid': dataTestId = 'Input',
        ...otherProps
    } = props;

    const ref = useRef() as MutableRefObject<HTMLInputElement>;
    const [isFocused, setIsFocused] = useState<boolean>(false);

    useEffect(() => {
        if (autofocus) setIsFocused(true);
        ref.current?.focus();
    }, [autofocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };
    const onBlur = () => setIsFocused(false);
    const onFocus = () => setIsFocused(true);

    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.focused]: isFocused,
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
    };

    const input = (
        <div
            className={classNames(cls.InputWrapper, mods, [
                className,
                cls[size],
            ])}
        >
            <div className={cls.addonLeft}>{addonLeft}</div>
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={cls.input}
                onFocus={onFocus}
                onBlur={onBlur}
                readOnly={readonly}
                data-testid={dataTestId}
                placeholder={placeholder}
                {...otherProps}
            />
            <div className={cls.addonRight}>{addonRight}</div>
        </div>
    );

    if (label)
        return (
            <HStack max gap="8">
                <Text text={label} />
                {input}
            </HStack>
        );

    return input;
});
