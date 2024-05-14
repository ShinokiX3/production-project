import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleList, ArticleView } from 'entities/Article';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DymanicModuleLoader/DynamicModuleLoader';
import {
	articlesPageActions,
	articlesPageReducer,
	getArticles
} from 'pages/ArticlesPage/model/slices/articlesPageSlice';
import useInitialEffect from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import { useSelector } from 'react-redux';
import {
	getArticlesPageError,
	getArticlesPageIsLoading,
	getArticlesPageView
} from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { ArticleViewSelector } from 'features/ArticleViewSelector/ui/ArticleViewSelector';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
	articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
	const dispatch = useAppDispatch();
	const articles = useSelector(getArticles.selectAll);
	const isLoading = useSelector(getArticlesPageIsLoading);
	const error = useSelector(getArticlesPageError);
	const view = useSelector(getArticlesPageView);

	const { t } = useTranslation();

	useInitialEffect(() => {
		dispatch(fetchArticlesList());
		dispatch(articlesPageActions.initState());
	});

	const onChangeView = useCallback((view: ArticleView) => {
		dispatch(articlesPageActions.setVIew(view));
	}, [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={classNames(cls.ArticlePage, {}, [className])}>
				<ArticleViewSelector view={view} onViewClick={onChangeView} />
				<ArticleList
					isLoading={isLoading}
					view={view}
					articles={articles}
				/>
			</div>
		</DynamicModuleLoader>
	);
};

export default memo(ArticlesPage);
