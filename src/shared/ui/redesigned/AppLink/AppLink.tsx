import { LinkProps, NavLink } from 'react-router-dom';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    activeClassName?: string;
}

export const AppLink: React.FC<AppLinkProps> = memo((props) => {
    const {
        to,
        className,
        children,
        variant = 'primary',
        activeClassName,
        ...otherProps
    } = props;
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                classNames(
                    cls.AppLink,
                    { [activeClassName || cls.active]: isActive },
                    [className, cls[variant]],
                )
            }
            {...otherProps}
        >
            {children}
        </NavLink>
    );
});
