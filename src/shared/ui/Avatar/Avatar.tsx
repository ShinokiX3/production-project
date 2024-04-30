import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, useMemo } from 'react';
import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    alt?: string;
    size?: number;
}

export const Avatar = ({
	className, src, alt = 'Avatar', size = 100
}: AvatarProps) => {
	const mods: Mods = {};

	const styles = useMemo<CSSProperties>(() => ({ width: size, height: size }), [size]);

	return (
		<img
			src={src}
			alt={alt}
			className={classNames(cls.Avatar, mods, [className])}
			style={styles}
		/>
	);
};
