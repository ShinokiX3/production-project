import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useInitialEffect from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { ArticleList } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
	initArticlesPage
} from '../../model/services/initArticlesPage/initArticlesPage';
import { getArticles } from '../../model/slices/articlesPageSlice';
import {
	getArticlesPageError,
	getArticlesPageIsLoading,
	getArticlesPageView
} from '../../model/selectors/articlesPageSelectors';

interface ArticleInfiniteListProps {
    className?: string;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
	const { className } = props;

	const dispatch = useAppDispatch();
	const articles = useSelector(getArticles.selectAll);
	const isLoading = useSelector(getArticlesPageIsLoading);
	const error = useSelector(getArticlesPageError);
	const view = useSelector(getArticlesPageView);

	const [searchParams] = useSearchParams();

	useInitialEffect(() => {
		dispatch(initArticlesPage(searchParams));
	});

	if (error) return null;

	return (
		<ArticleList
			view={view}
			isLoading={isLoading}
			articles={articles}
			className={className}
		/>
	);
});
