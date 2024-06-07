import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { ReducersList } from '@/shared/lib/components/DymanicModuleLoader/DynamicModuleLoader';
import { profileReducer } from '@/features/editableProfileCard';
import { articleDetailsReducer } from '@/entities/Article';
import { addCommentFormReducer } from '@/features/addCommentForm';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage';
import { loginReducer } from '@/features/AuthByUsername';

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
