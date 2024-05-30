import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleRecommendationList } from './ArticleRecommendationList';

export default {
	title: 'features/ArticleRecommendationList',
	component: ArticleRecommendationList,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ArticleRecommendationList>;

const Template: ComponentStory<typeof ArticleRecommendationList> = (args) => <ArticleRecommendationList {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
