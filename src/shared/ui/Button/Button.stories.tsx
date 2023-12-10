import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Button, SizeButton, ThemeButton } from './Button';

export default {
	title: 'shared/Button',
	component: Button,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	children: 'text'
};

export const Clear = Template.bind({});
Clear.args = {
	children: 'text',
	theme: ThemeButton.CLEAR
};

export const ClearInverted = Template.bind({});
ClearInverted.args = {
	children: 'text',
	theme: ThemeButton.CLEAR_INVERTED
};

export const Outline = Template.bind({});
Outline.args = {
	children: 'text',
	theme: ThemeButton.OUTLINE
};

export const OutlineSizeL = Template.bind({});
OutlineSizeL.args = {
	children: 'text',
	theme: ThemeButton.OUTLINE,
	size: SizeButton.L
};

export const OutlineSizeXL = Template.bind({});
OutlineSizeXL.args = {
	children: 'text',
	theme: ThemeButton.OUTLINE,
	size: SizeButton.XL
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
	children: 'text',
	theme: ThemeButton.OUTLINE
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundTheme = Template.bind({});
BackgroundTheme.args = {
	children: 'text',
	theme: ThemeButton.BACKGROUND
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
	children: 'text',
	theme: ThemeButton.BACKGROUND_INVERTED
};

export const Square = Template.bind({});
Square.args = {
	children: '>',
	theme: ThemeButton.BACKGROUND,
	square: true
};

export const SquareL = Template.bind({});
SquareL.args = {
	children: '>',
	theme: ThemeButton.BACKGROUND_INVERTED,
	square: true,
	size: SizeButton.L,
};

export const SquareXL = Template.bind({});
SquareXL.args = {
	children: '>',
	theme: ThemeButton.BACKGROUND_INVERTED,
	square: true,
	size: SizeButton.XL,
};

export const Disabled = Template.bind({});
Disabled.args = {
	children: '>',
	theme: ThemeButton.OUTLINE,
	disabled: true,
};
