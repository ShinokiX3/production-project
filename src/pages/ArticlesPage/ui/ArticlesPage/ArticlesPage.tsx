import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleList, ArticleView } from 'entities/Article';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
	const { t } = useTranslation();

	return (
		<div className={classNames(cls.ArticlePage, {}, [className])}>
			<ArticleList
				isLoading
				view={ArticleView.LIST}
				articles={[]}
			/>
		</div>
	);
};

export default memo(ArticlesPage);
