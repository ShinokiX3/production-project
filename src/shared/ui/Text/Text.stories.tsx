import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Text, TextSize, TextTheme } from './Text';

export default {
	title: 'shared/Text',
	component: Text,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	title: 'title',
	text: 'text',
};

export const Error = Template.bind({});
Error.args = {
	title: 'title',
	text: 'text',
	theme: TextTheme.ERROR,
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
	title: 'title',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
	text: 'text',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
	title: 'title',
	text: 'text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
	title: 'title',
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
	text: 'text',
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeM = Template.bind({});
SizeM.args = {
	title: 'title',
	text: 'text',
	size: TextSize.M
};

export const SizeL = Template.bind({});
SizeL.args = {
	title: 'title',
	text: 'text',
	size: TextSize.L
};
