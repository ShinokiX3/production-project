import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword.test', () => {
	test('should return string value', () => {
		const state: DeepPartial<StateSchema> = {
			loginForm: {
				password: 'password'
			}
		};
		expect(getLoginPassword(state as StateSchema)).toEqual('password');
	});
	test('should return empty string', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getLoginPassword(state as StateSchema)).toEqual('');
	});
});
