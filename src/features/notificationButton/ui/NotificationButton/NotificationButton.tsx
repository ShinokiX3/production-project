import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import NotificationIconDeprecated from '@/shared/assets/icons/notification-20-20.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { NotificationList } from '@/entities/Notification';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import cls from './NotificationButton.module.scss';
import { ToggleFeatures } from '@/shared/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Icon
                    Svg={NotificationIcon}
                    clickable
                    onClick={showDrawer}
                    className={cls.icon}
                />
            }
            off={
                <ButtonDeprecated
                    theme={ThemeButton.CLEAR}
                    className={cls.button}
                >
                    <IconDeprecated
                        Svg={NotificationIconDeprecated}
                        className={cls.icon}
                    />
                </ButtonDeprecated>
            }
        />
    );

    return (
        <div>
            <BrowserView>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <Popover
                            className={classNames(cls.NotificationButton, {}, [
                                className,
                            ])}
                            direction="bottom left"
                            trigger={trigger}
                        >
                            <NotificationList className={cls.notifications} />
                        </Popover>
                    }
                    off={
                        <PopoverDeprecated
                            className={classNames(cls.NotificationButton, {}, [
                                className,
                            ])}
                            direction="bottom left"
                            trigger={trigger}
                        >
                            <NotificationList className={cls.notifications} />
                        </PopoverDeprecated>
                    }
                />
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
