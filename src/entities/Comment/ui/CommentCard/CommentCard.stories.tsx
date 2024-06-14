import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CommentCard } from './CommentCard';

export default {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
    <CommentCard {...args} />
);

export const Loading = Template.bind({});
Loading.args = {
    comment: {
        id: '1',
        text: 'Does it?',
        user: { id: '1', username: 'Roman' },
    },
    isLoading: true,
};
