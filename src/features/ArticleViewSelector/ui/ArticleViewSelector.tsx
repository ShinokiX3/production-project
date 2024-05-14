import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleView } from 'entities/Article';
import ListIcon from 'shared/assets/icons/list-20-20.svg';
import TiledIcon from 'shared/assets/icons/tiled-20-20.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
	{
		view: ArticleView.PLATE,
		icon: TiledIcon,
	},
	{
		view: ArticleView.LIST,
		icon: ListIcon,
	},
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
	const { className, view, onViewClick } = props;

	const onClick = (view: ArticleView) => () => {
		onViewClick?.(view);
	};

	return (
		<div className={classNames(cls.ArticleViewSelector, {}, [className])}>
			{viewTypes.map((type) => (
				<Button
					theme={ThemeButton.CLEAR}
					onClick={onClick(type.view)}
				>
					<Icon className={classNames('', { [cls.selected]: type.view !== view }, [])} Svg={type.icon} />
				</Button>
			))}
		</div>
	);
});
