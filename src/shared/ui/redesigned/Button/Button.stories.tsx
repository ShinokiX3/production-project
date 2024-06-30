import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Button } from './Button';

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
    children: 'text',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'text',
    variant: 'clear',
};

export const Outline = Template.bind({});
Outline.args = {
    children: 'text',
    variant: 'outline',
};

export const OutlineSizeL = Template.bind({});
OutlineSizeL.args = {
    children: 'text',
    variant: 'outline',
    size: 'l',
};

export const OutlineSizeXL = Template.bind({});
OutlineSizeXL.args = {
    children: 'text',
    variant: 'outline',
    size: 'xl',
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    children: 'text',
    variant: 'outline',
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Square = Template.bind({});
Square.args = {
    children: '>',
    variant: 'outline',
    square: true,
};

export const SquareL = Template.bind({});
SquareL.args = {
    children: '>',
    variant: 'outline',
    square: true,
    size: 'l',
};

export const SquareXL = Template.bind({});
SquareXL.args = {
    children: '>',
    variant: 'outline',
    square: true,
    size: 'xl',
};

export const Disabled = Template.bind({});
Disabled.args = {
    children: '>',
    variant: 'outline',
    disabled: true,
};
