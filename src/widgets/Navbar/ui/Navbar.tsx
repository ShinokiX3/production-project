import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal/Modal';
import { useCallback, useState } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import cls from './Navbar.module.scss';

interface NavbarProps {
	className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
	const [isAuthModal, setIsAuthModal] = useState<boolean>(false);

	const { t } = useTranslation();

	const toggleModal = useCallback(() => {
		setIsAuthModal((prev) => !prev);
	}, []);

	return (
		<div className={classNames(cls.Navbar, {}, [className])}>
			<Button theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={toggleModal}>
				{t('Войти')}
			</Button>
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<Modal isOpen={isAuthModal} onClose={toggleModal}>
				Rerum nulla animi consequuntur, error excepturi eius,
				blanditiis perspiciatis officiis commodi amet alias sunt
				aut quos esse reprehenderit in assumenda ipsum fugit totam!
				Voluptates explicabo vel ullam exercitationem, quod placeat?
			</Modal>
		</div>
	);
};
