import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';
import cls from './Code.module.scss';
import { Button, ThemeButton } from '../Button/Button';

interface CodeProps {
    className?: string;
    text: string;
}

/**
 * Deprecated, use new components from redesigned
 * @deprecated
 */
export const Code = memo((props: CodeProps) => {
    const { className, text } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button
                onClick={onCopy}
                className={cls.copy_btn}
                theme={ThemeButton.CLEAR}
            >
                <CopyIcon className={cls.copy_icon} />
            </Button>
            <code>{text}</code>
        </pre>
    );
});
