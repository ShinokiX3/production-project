import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import ThemeIconDeprecated from '@/shared/assets/icons/theme-light.svg';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { Button } from '../../Button/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJSONSettings } from '@/entities/User';
import { Icon, Icon as IconDeprecated } from '../../Icon';
import { ToggleFeatures } from '@/shared/features';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            dispatch(saveJSONSettings({ theme: newTheme }));
        });
    }, [dispatch, toggleTheme]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={<Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />}
            off={
                <Button
                    variant="clear"
                    className={classNames('', {}, [className])}
                    onClick={onToggleHandler}
                >
                    {/* eslint-disable-next-line react/jsx-max-props-per-line */}
                    <IconDeprecated
                        Svg={ThemeIconDeprecated}
                        width={40}
                        height={40}
                    />
                </Button>
            }
        />
    );
});
