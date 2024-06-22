import { Menu as MenuUI } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { AppLink } from '../../../AppLink/AppLink';
import cls from './Menu.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

export interface MenuItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface MenuProps {
    className?: string;
    items: MenuItem[];
    direction?: DropdownDirection;
    trigger: ReactNode;
}

/**
 * Deprecated, use new components from redesigned
 * @deprecated
 */
export const Menu = (props: MenuProps) => {
    const { className, trigger, items, direction = 'bottom right' } = props;

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <MenuUI
            as="div"
            className={classNames(cls.Menu, {}, [className, popupCls.popup])}
        >
            <MenuUI.Button className={popupCls.trigger}>
                {trigger}
            </MenuUI.Button>
            <MenuUI.Items className={classNames(cls.menu, {}, menuClasses)}>
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={classNames(cls.item, {
                                [popupCls.active]: active,
                            })}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <MenuUI.Item
                                key={`menu-key-${index}`}
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                            >
                                {content}
                            </MenuUI.Item>
                        );
                    }

                    return (
                        <MenuUI.Item
                            key={`menu-key-${index}`}
                            as={Fragment}
                            disabled={item.disabled}
                        >
                            {content}
                        </MenuUI.Item>
                    );
                })}
            </MenuUI.Items>
        </MenuUI>
    );
};
