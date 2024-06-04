import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { Popover } from 'shared/ui/Popups';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg';
import { NotificationList } from 'entities/Notification';
import { Drawer } from 'shared/ui/Drawer/Drawer';
import { BrowserView, MobileView } from 'react-device-detect';
import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
	const { className } = props;
	const { t } = useTranslation();

	const [isDrawer, setIsDrawer] = useState(false);

	const showDrawer = () => setIsDrawer(true);
	const closeDrawer = () => setIsDrawer(false);

	const trigger = (
		<Button onClick={showDrawer} theme={ThemeButton.CLEAR}>
			<Icon Svg={NotificationIcon} inverted />
		</Button>
	);

	return (
		<div>
			<BrowserView>
				<Popover
					className={classNames(cls.NotificationButton, {}, [className])}
					direction="bottom left"
					trigger={trigger}
				>
					<NotificationList className={cls.notifications} />
				</Popover>
			</BrowserView>

			<MobileView>
				{trigger}
				<Drawer isOpen={isDrawer} onClose={closeDrawer}>
					<NotificationList />
				</Drawer>
			</MobileView>
		</div>
	);
});