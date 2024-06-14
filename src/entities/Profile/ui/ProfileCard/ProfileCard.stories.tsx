import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import avatar from '@/shared/assets/tests/storybook.jpg';
import { ProfileCard } from './ProfileCard';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
    <ProfileCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    data: {
        username: 'admin',
        age: 22,
        country: Country.Ukraine,
        lastname: 'asd',
        first: 'asf',
        city: 'Kiev',
        currency: Currency.UAH,
        avatar,
    },
};
Primary.decorators = [StoreDecorator({})];

export const Lodaing = Template.bind({});
Lodaing.args = {
    isLoading: true,
};
Lodaing.decorators = [StoreDecorator({})];

export const Error = Template.bind({});
Error.args = {
    error: 'true',
};
Error.decorators = [StoreDecorator({})];
