import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AvatarMenu } from './AvatarMenu';

export default {
    title: 'features/AvatarMenu',
    component: AvatarMenu,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AvatarMenu>;

const Template: ComponentStory<typeof AvatarMenu> = (args) => (
    <AvatarMenu {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
