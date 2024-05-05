import {
	PayloadAction,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

const commentsAdapter = createEntityAdapter<Comment>({
	selectId: (comment: Comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
	(state) => state.articleDetailsComments || commentsAdapter.getInitialState()
);

const articleDetailsCommentsSlice = createSlice({
	name: 'articleDetailsCommentsSlice',
	initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
		isLoading: false,
		error: undefined,
		ids: ['1', '2'],
		entities: {
			1: {
				id: '1',
				text: 'Comment 1',
				user: { id: '1', username: 'Roman' }
			},
			2: {
				id: '2',
				text: 'Comment 2',
				user: { id: '1', username: 'Roman' }
			},
		}
	}),
	reducers: {

	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCommentsByArticleId.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchCommentsByArticleId.fulfilled, (
				state,
				action: PayloadAction<Comment[]>
			) => {
				state.isLoading = false;
				commentsAdapter.setAll(state, action.payload);
			})
			.addCase(fetchCommentsByArticleId.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	}
});

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice;
