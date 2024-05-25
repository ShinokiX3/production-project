import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListBox } from './ListBox';

const items = [
	{
		content: 'fffffffffff',
		value: '1'
	},
	{
		content: 'fffffffffff',
		value: '2'
	},
	{
		content: 'fffffffffff',
		value: '3'
	},
	{
		content: 'fffffffffff',
		value: '4'
	},
	{
		content: 'fffffffffff',
		value: '5'
	},
	{
		content: 'fffffffffff',
		value: '6'
	},
	{
		content: 'fffffffffff',
		value: '7'
	},
	{
		content: 'fffffffffff',
		value: '8'
	},
	{
		content: 'fffffffffff',
		value: '9'
	},
	{
		content: 'fffffffffff',
		value: '10'
	}
];

export default {
	title: 'shared/ListBox',
	component: ListBox,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	decorators: [
		(Story) => <div style={{ padding: '150px' }}><Story /></div>
	]
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const TopLeft = Template.bind({});
TopLeft.args = {
	items,
	value: '1',
	direction: 'top left'
};

export const TopRight = Template.bind({});
TopRight.args = {
	items,
	value: '1',
	direction: 'top right'
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
	items,
	value: '1',
	direction: 'bottom left'
};

export const BottomRight = Template.bind({});
BottomRight.args = {
	items,
	value: '1',
	direction: 'bottom right'
};
