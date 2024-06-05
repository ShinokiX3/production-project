import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import { Icon } from '../Icon/Icon';
import StarIcon from '@/shared/assets/icons/star-20-20.svg';

interface StarRatingProps {
    className?: string;
    onSelect?: (count: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
	const {
		className, selectedStars, onSelect, size
	} = props;

	const [currentStartCount, setCurrentStartCount] = useState(0);
	const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

	const onHover = (starsCount: number) => () => {
		if (!isSelected) setCurrentStartCount(starsCount);
	};

	const onLeave = () => {
		if (!isSelected) setCurrentStartCount(0);
	};

	const onClick = (starsCount: number) => () => {
		if (!isSelected) {
			onSelect?.(starsCount);
			setCurrentStartCount(starsCount);
			setIsSelected(true);
		}
	};

	const mods = {
		[cls.selected]: isSelected
	};

	return (
		<div className={classNames(cls.StarRating, {}, [className])}>
			{stars.map((starNumber) => (
				<Icon
					className={classNames(
						cls.star_icon,
						{ ...mods, [cls.hovered]: currentStartCount >= starNumber },
						[]
					)}
					width={size}
					height={size}
					Svg={StarIcon}
					key={starNumber}
					onClick={onClick(starNumber)}
					onMouseEnter={onHover(starNumber)}
					onMouseLeave={onLeave}
				/>
			))}
		</div>
	);
});
