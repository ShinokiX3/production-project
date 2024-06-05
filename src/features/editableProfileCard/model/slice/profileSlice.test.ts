import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { profileActions, profileReducer } from './profileSlice';
import { ProfileSchema } from '../types/editableProfileCardSchema';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ValidateProfileError } from '../consts/consts';

const data = {
	username: 'admin',
	age: 22,
	country: Country.Ukraine,
	lastname: 'asd',
	first: 'asf',
	city: 'Kiev',
	currency: Currency.UAH,
};

describe('profileSlice.test', () => {
	test('test set readonly', () => {
		const state: DeepPartial<ProfileSchema> = { readonly: false };
		expect(profileReducer(
            state as ProfileSchema,
            profileActions.setReadonly(true)
		)).toStrictEqual({ readonly: true });
	});

	test('test cancel edit', () => {
		const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } };
		expect(profileReducer(
            state as ProfileSchema,
            profileActions.cancelEdit()
		)).toStrictEqual({
			readonly: true,
			validateError: undefined,
			data,
			form: data,
		});
	});

	test('test update profile', () => {
		const state: DeepPartial<ProfileSchema> = { form: { username: '' } };
		expect(profileReducer(
            state as ProfileSchema,
            profileActions.updateProfile({ username: '12345' })
		)).toStrictEqual({
			form: { username: '12345' }
		});
	});

	test('test update profile service pending', () => {
		const state: DeepPartial<ProfileSchema> = {
			isLoading: false,
			validateError: [ValidateProfileError.SERVER_ERROR]
		};
		expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.pending
		)).toStrictEqual({
			isLoading: true,
			validateError: undefined
		});
	});

	test('test update profile service fulfilled', () => {
		const state: DeepPartial<ProfileSchema> = {
			isLoading: true,
		};
		expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.fulfilled(data, '')
		)).toStrictEqual({
			isLoading: false,
			validateError: undefined,
			readonly: true,
			form: data,
			data,
		});
	});
});
