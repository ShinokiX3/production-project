import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	Article, ArticleBlockType, ArticleTextBlock, ArticleView
} from 'entities/Article/model/types/article';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useTranslation } from 'react-i18next';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import cls from './ArticleListItem.module.scss';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
	target?: React.HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
	const {
		className,
		article,
		view,
		target
	} = props;

	const { t } = useTranslation();

	const types = <Text className={cls.types} text={article.type.join(', ')} />;
	const views = (
		<>
			<Text className={cls.views} text={String(article.views)} />
			<Icon Svg={EyeIcon} />
		</>
	);

	if (view === ArticleView.LIST) {
		const textBlock = article.blocks.find(
			(block) => block.type === ArticleBlockType.TEXT
		) as ArticleTextBlock;

		return (
			<div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
				<Card className={cls.card}>
					<div className={cls.header}>
						<Avatar size={30} src={article.user.avatar} />
						<Text className={cls.username} text={article.user.username} />
						<Text className={cls.date} text={article.createdAt} />
					</div>
					<Text className={cls.title} text={article.title} />
					{types}
					<img className={cls.image} src={article.img} alt={article.title} />
					{textBlock && (
						<ArticleTextBlockComponent className={cls.text_block} block={textBlock} />
					)}
					<div className={cls.footer}>
						<AppLink target={target} to={RoutePath.article_details + article.id}>
							<Button theme={ThemeButton.OUTLINE}>
								{t('Read more...')}
							</Button>
						</AppLink>
						{views}
					</div>
				</Card>
			</div>
		);
	}

	return (
		<AppLink
			target={target}
			to={RoutePath.article_details + article.id}
			className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
		>
			<Card className={cls.card}>
				<div className={cls.image_wrapper}>
					<img className={cls.image} src={article.img} alt="" />
					<Text className={cls.date} text={article.createdAt} />
				</div>
				<div className={cls.info_wrapper}>
					{types}
					{views}
				</div>
				<Text className={cls.title} text={article.title} />
			</Card>
		</AppLink>
	);
});
