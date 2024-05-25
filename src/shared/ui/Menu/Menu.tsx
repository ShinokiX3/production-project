import { Menu as MenuUI } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Fragment, ReactNode } from 'react';
import { DropdownDirection } from 'shared/types/ui';
import { AppLink } from '../AppLink/AppLink';
import cls from './Menu.module.scss';

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

const mapDirectionClass: Record<DropdownDirection, string> = {
	'bottom left': cls.options_b_l,
	'top left': cls.options_t_l,
	'bottom right': cls.options_b_r,
	'top right': cls.options_t_r
};

export const Menu = (props: MenuProps) => {
	const {
		className, trigger, items, direction = 'bottom right',
	} = props;

	const menuClasses = [mapDirectionClass[direction]];

	return (
		<MenuUI as="div" className={classNames(cls.Menu, {}, [className])}>
			<MenuUI.Button className={cls.btn}>
				{trigger}
			</MenuUI.Button>
			<MenuUI.Items className={classNames(cls.menu, {}, menuClasses)}>
				{items.map((item) => {
					const content = ({ active }: {active: boolean}) => (
						<button
							type="button"
							disabled={item.disabled}
							onClick={item.onClick}
							className={classNames(cls.item, { [cls.active]: active })}
						>
							{item.content}
						</button>
					);

					if (item.href) {
						return (
							<MenuUI.Item as={AppLink} to={item.href} disabled={item.disabled}>
								{content}
							</MenuUI.Item>
						);
					}

					return (
						<MenuUI.Item as={Fragment} disabled={item.disabled}>
							{content}
						</MenuUI.Item>
					);
				})}

			</MenuUI.Items>
		</MenuUI>
	);
};
