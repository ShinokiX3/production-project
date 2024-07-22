import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    Button as ButtonDepreacted,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { LoginModal } from '@/features/AuthByUsername';
import { getUserAuthData } from '@/entities/User';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { HStack } from '@/shared/ui/deprecated/Stack';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarMenu } from '@/features/avatarMenu';
import cls from './Navbar.module.scss';
import { getRouteArticleCreate } from '@/shared/const/router';
import { ToggleFeatures, toggleFeatures } from '@/shared/features';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState<boolean>(false);
    const { t } = useTranslation();

    const authData = useSelector(getUserAuthData);

    const showModal = useCallback(() => setIsAuthModal(true), []);
    const closeModal = useCallback(() => setIsAuthModal(false), []);

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.NavbarRedesigned,
        off: () => cls.Navbar,
    });

    if (authData) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <header className={classNames(mainClass, {}, [className])}>
                        <HStack gap="16" className={cls.actions}>
                            <NotificationButton />
                            <AvatarMenu />
                        </HStack>
                    </header>
                }
                off={
                    <header className={classNames(mainClass, {}, [className])}>
                        <Text
                            className={cls.application_logo}
                            title={t('Full prod')}
                            theme={TextTheme.INVERTED}
                        />
                        <AppLink
                            className={cls.create_article}
                            theme={AppLinkTheme.SECONDARY}
                            to={getRouteArticleCreate()}
                        >
                            {t('Create article')}
                        </AppLink>
                        <HStack gap="16" className={cls.actions}>
                            <NotificationButton />
                            <AvatarMenu />
                        </HStack>
                    </header>
                }
            />
        );
    }

    return (
        <header className={classNames(mainClass, {}, [className])}>
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <ButtonDepreacted
                        theme={ThemeButton.CLEAR_INVERTED}
                        className={cls.links}
                        onClick={showModal}
                    >
                        {t('Войти')}
                    </ButtonDepreacted>
                }
                on={
                    <Button
                        variant="clear"
                        className={cls.links}
                        onClick={showModal}
                    >
                        {t('Войти')}
                    </Button>
                }
            />
            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={closeModal} />
            )}
        </header>
    );
});
