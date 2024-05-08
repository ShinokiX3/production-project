import { createAsyncThunk } from '@reduxjs/toolkit';
import i18n from 'shared/config/i18n/i18n';
import { getUserAuthData } from 'entities/User';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Comment } from 'entities/Comment';
import { getArticleDetailsData } from 'entities/Article';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
		Comment,
		string,
		ThunkConfig<string>
	>(
		'articleDetails/addCommentForArticle',
		async (text, thunkApi) => {
			const {
				dispatch, extra, rejectWithValue, getState
			} = thunkApi;

			const userData = getUserAuthData(getState());
			const article = getArticleDetailsData(getState());

			if (!userData || !text || !article) {
				console.log(userData, text, article);
				return rejectWithValue('no data');
			}

			try {
				const response = await extra.api.post<Comment>('/comments', {
					articleId: article.id,
					userId: userData.id,
					text,
				});

				if (!response.data) throw new Error('error');

				dispatch(fetchCommentsByArticleId(article.id));

				return response.data;
			} catch (error) {
				return rejectWithValue(i18n.t('Неверный логин или пароль'));
			}
		}
	);
