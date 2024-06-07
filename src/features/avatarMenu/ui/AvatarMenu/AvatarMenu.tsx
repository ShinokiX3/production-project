import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Menu } from '@/shared/ui/Popups';
import { Avatar } from '@/shared/ui/Avatar';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
	getUserAuthData, isUserAdmin, isUserManager, userActions
} from '@/entities/User';
import cls from './AvatarMenu.module.scss';
import { RoutePath } from '@/shared/const/router';

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

	const logout = useCallback(() => dispatch(userActions.logout()), [dispatch]);

	const isAdminPanelAvailable = isAdmin || isManager;

	if (!authData) return null;

	return (
		<Menu
			className={classNames(cls.AvatarMenu, {}, [className])}
			direction="bottom left"
			items={[
				...(isAdminPanelAvailable ? [{
					content: t('Admin panel'),
					href: RoutePath.admin_panel
				}] : []),
				{
					content: t('Profile'),
					href: RoutePath.profile + authData.id
				},
				{
					content: t('Quit'),
					onClick: logout
				}
			]}
			trigger={<Avatar size={30} src={authData.avatar} />}
		/>
	);
});
