import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Menu as MenuDeprecated } from '@/shared/ui/deprecated/Popups';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    getUserAuthData,
    isUserAdmin,
    isUserManager,
    userActions,
} from '@/entities/User';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/features';
import { Menu } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

interface AvatarMenuProps {
    className?: string;
}

export const AvatarMenu = memo((props: AvatarMenuProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    const logout = useCallback(
        () => dispatch(userActions.logout()),
        [dispatch],
    );

    const isAdminPanelAvailable = isAdmin || isManager;

    if (!authData) return null;

    const items = [
        ...(isAdminPanelAvailable
            ? [
                  {
                      content: t('Admin'),
                      href: getRouteAdminPanel(),
                  },
              ]
            : []),
        {
            content: t('Profile'),
            href: getRouteProfile(authData.id),
        },
        {
            content: t('Quit'),
            onClick: logout,
        },
    ];

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Menu
                    className={classNames('', {}, [className])}
                    direction="bottom left"
                    items={items}
                    trigger={<Avatar size={40} src={authData.avatar} />}
                />
            }
            off={
                <MenuDeprecated
                    className={classNames('', {}, [className])}
                    direction="bottom left"
                    items={items}
                    trigger={
                        <AvatarDeprecated
                            fallbackInverted
                            size={30}
                            src={authData.avatar}
                        />
                    }
                />
            }
        />
    );
});
