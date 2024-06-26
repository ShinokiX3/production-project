import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import { HStack } from '../Stack';

interface AppLogoProps {
    className?: string;
    size?: number;
}

/**
 * Deprecated, use new components from redesigned
 * @deprecated
 */
export const AppLogo = memo((props: AppLogoProps) => {
    const { className, size = 32 } = props;

    return (
        <HStack
            max
            justify="center"
            className={classNames(cls.AppLogoWrapper, {}, [className])}
        >
            <div className={cls.gradientBig} />
            <div className={cls.gradientSmall} />
            <AppSvg width={size} height={size} className={cls.appLogo} />
        </HStack>
    );
});
