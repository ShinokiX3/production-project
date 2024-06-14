import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Profile } from '@/entities/Profile';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { $api } from '@/shared/api/api';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 22,
    currency: Currency.USD,
    country: Country.Ukraine,
    city: 'Kiev',
    username: 'AdminX3',
};

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: {
                id: '1',
                username: 'admin',
            },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
};

describe('features/EditableProfileCard', () => {
    test('switch to readonly mode', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.Edit'),
        );
        expect(
            screen.getByTestId('EditableProfileCardHeader.Cancel'),
        ).toBeInTheDocument();
    });

    test('when cancel should clear inputs value', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.Edit'),
        );

        await userEvent.clear(screen.getByTestId('ProfileCard.Lastname'));

        await userEvent.type(
            screen.getByTestId('ProfileCard.Lastname'),
            'user',
        );

        expect(screen.getByTestId('ProfileCard.Lastname')).toHaveValue('user');

        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.Cancel'),
        );

        expect(screen.getByTestId('ProfileCard.Lastname')).toHaveValue('admin');
    });

    test('should throw error when saved on incorrect values', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.Edit'),
        );

        await userEvent.clear(screen.getByTestId('ProfileCard.Firstname'));
        await userEvent.clear(screen.getByTestId('ProfileCard.Lastname'));

        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.Save'),
        );
        expect(
            screen.getByTestId('EditableProfileCard.Error.Paragraph'),
        ).toBeInTheDocument();
    });

    test('put request on save with new values', async () => {
        const mockPutReq = jest.spyOn($api, 'put');
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.Edit'),
        );

        await userEvent.clear(screen.getByTestId('ProfileCard.Lastname'));

        await userEvent.type(
            screen.getByTestId('ProfileCard.Lastname'),
            'user',
        );

        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.Save'),
        );

        expect(mockPutReq).toHaveBeenCalled();
    });
});
