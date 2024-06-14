import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername.test', () => {
    test('should return string value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: 'User',
            },
        };
        expect(getLoginUsername(state as StateSchema)).toEqual('User');
    });
    test('should return empty string', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginUsername(state as StateSchema)).toEqual('');
    });
});
