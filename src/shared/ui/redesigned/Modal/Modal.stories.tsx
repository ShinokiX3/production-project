import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Modal } from './Modal';

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    isOpen: true,
    children: `Rerum nulla animi consequuntur, error excepturi eius,
    blanditiis perspiciatis officiis commodi amet alias sunt
    aut quos esse reprehenderit in assumenda ipsum fugit totam!
    Voluptates explicabo vel ullam exercitationem, quod placeat?`,
};

export const Dark = Template.bind({});
Dark.args = {
    isOpen: true,
    children: `Rerum nulla animi consequuntur, error excepturi eius,
    blanditiis perspiciatis officiis commodi amet alias sunt
    aut quos esse reprehenderit in assumenda ipsum fugit totam!
    Voluptates explicabo vel ullam exercitationem, quod placeat?`,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
