import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import cls from './Navbar.module.scss';

interface NavbarProps {
	className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
	const [isAuthModal, setIsAuthModal] = useState<boolean>(false);

	const { t } = useTranslation();

	const dispatch = useDispatch();
	const authData = useSelector(getUserAuthData);

	const showModal = useCallback(() => setIsAuthModal(true), []);
	const closeModal = useCallback(() => setIsAuthModal(false), []);
	const logout = useCallback(() => dispatch(userActions.logout()), [dispatch]);

	if (authData) {
		return (
			<header className={classNames(cls.Navbar, {}, [className])}>
				<Button theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={logout}>
					{t('Выйти')}
				</Button>
			</header>
		);
	}

	return (
		<header className={classNames(cls.Navbar, {}, [className])}>
			<Button theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={showModal}>
				{t('Войти')}
			</Button>
			{isAuthModal && <LoginModal isOpen={isAuthModal} onClose={closeModal} />}
		</header>
	);
});
