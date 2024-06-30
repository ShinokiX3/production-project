import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Flex } from './Flex';

export default {
    title: 'shared/Flex',
    component: Flex,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Row = Template.bind({});
Row.args = {
    children: (
        <>
            <div>Hi</div>
            <div>Hi</div>
            <div>Hi</div>
            <div>Hi</div>
        </>
    ),
};

export const Column = Template.bind({});
Column.args = {
    direction: 'column',
    children: (
        <>
            <div>Hi</div>
            <div>Hi</div>
            <div>Hi</div>
            <div>Hi</div>
        </>
    ),
};

export const RowGap16 = Template.bind({});
RowGap16.args = {
    direction: 'row',
    gap: '16',
    children: (
        <>
            <div>Hi</div>
            <div>Hi</div>
            <div>Hi</div>
            <div>Hi</div>
        </>
    ),
};

export const ColumnGap32 = Template.bind({});
ColumnGap32.args = {
    direction: 'column',
    gap: '32',
    children: (
        <>
            <div>Hi</div>
            <div>Hi</div>
            <div>Hi</div>
            <div>Hi</div>
        </>
    ),
};
