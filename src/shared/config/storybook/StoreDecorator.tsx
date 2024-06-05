import { Story } from '@storybook/react';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/model/slices';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { loginReducer } from '@/features/AuthByUsername/model/slice/loginSlice';
import { ReducersList } from '@/shared/lib/components/DymanicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice';
import { addCommentFormReducer } from '@/features/addCommentForm/model/slices/addCommentForm';
import { profileReducer } from '@/features/editableProfileCard';

const defaultAsyncReducers: ReducersList = {
	loginForm: loginReducer,
	profile: profileReducer,
	articleDetails: articleDetailsReducer,
	addCommentForm: addCommentFormReducer,
	articleDetailsPage: articleDetailsPageReducer,
};

export const StoreDecorator = (
	state: DeepPartial<StateSchema>,
	asyncReducers?: ReducersList
) => (StoryComponent: Story) => (
	<StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
		<StoryComponent />
	</StoreProvider>
);
