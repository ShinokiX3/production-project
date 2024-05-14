import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
	getArticlesPageInited
} from '../../selectors/articlesPageSelectors';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slices/articlesPageSlice';

export const initArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
	'articlesPage/initArticlesPage',
	async (_, thunkApi) => {
		const {
			getState, dispatch
		} = thunkApi;

		const _inited = getArticlesPageInited(getState());

		if (!_inited) {
			dispatch(articlesPageActions.initState());
			dispatch(fetchArticlesList({
				page: 1
			}));
		}
	}
);
