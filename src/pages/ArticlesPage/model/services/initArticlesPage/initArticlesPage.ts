import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import {
	getArticlesPageInited
} from '../../selectors/articlesPageSelectors';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { SortOrder } from '@/shared/types/sort';

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>(
	'articlesPage/initArticlesPage',
	async (searchParams, thunkApi) => {
		const {
			getState, dispatch
		} = thunkApi;

		const _inited = getArticlesPageInited(getState());

		if (!_inited) {
			const URLOrder = searchParams.get('order') as SortOrder;
			const URLSort = searchParams.get('sort') as ArticleSortField;
			const URLSearch = searchParams.get('search');
			const URLType = searchParams.get('type') as ArticleType;

			if (URLOrder) dispatch(articlesPageActions.setOrder(URLOrder));
			if (URLSort) dispatch(articlesPageActions.setSort(URLSort));
			if (URLSearch) dispatch(articlesPageActions.setSearch(URLSearch));
			if (URLType) dispatch(articlesPageActions.setType(URLType));

			dispatch(articlesPageActions.initState());
			dispatch(fetchArticlesList({}));
		}
	}
);
