import { classNames } from 'shared/lib/classNames/classNames';
import {
	MutableRefObject,
	memo, useEffect, useRef, useState
} from 'react';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
    className?: string;
    type?: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
	autofocus?: boolean;
}

export const Input = memo((props: InputProps) => {
	const {
		className, type = 'text', value, onChange, placeholder, autofocus, ...otherProps
	} = props;

	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [caretPosition, setCaretPosition] = useState(0);
	const ref = useRef() as MutableRefObject<HTMLInputElement>;

	useEffect(() => {
		if (autofocus) setIsFocused(true);
		ref.current?.focus();
	}, [autofocus]);

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
		setCaretPosition(e.target.value.length);
	};
	const onBlur = () => setIsFocused(false);
	const onFocus = () => setIsFocused(true);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onSelect = (e: any) => setCaretPosition(e?.target?.selectionStart || 0);

	return (
		<div className={classNames(cls.InputWrapper, {}, [className])}>
			{placeholder
				? (
					<div className={cls.placeholder}>
						{`${placeholder}>`}
					</div>
				)
				: null}
			<div className={cls.caret_wrapper}>
				<input
					ref={ref}
					type={type}
					value={value}
					onChange={onChangeHandler}
					className={cls.input}
					onFocus={onFocus}
					onBlur={onBlur}
					onSelect={onSelect}
					{...otherProps}
				/>
				{isFocused
					? (
						<span
							className={cls.caret}
							style={{ left: `${caretPosition * 9}px` }}
						/>
					)
					: null}
			</div>
		</div>
	);
});
