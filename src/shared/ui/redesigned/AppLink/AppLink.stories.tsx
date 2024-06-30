import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { AppLink } from './AppLink';

export default {
    title: 'shared/AppLink',
    component: AppLink,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => (
    <AppLink {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    children: 'text',
    variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
    children: 'text',
    variant: 'red',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    children: 'text',
    variant: 'primary',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
    children: 'text',
    variant: 'red',
};
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
