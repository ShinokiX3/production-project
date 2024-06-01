import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { validateProfileData } from './validateProfileData';
import { ValidateProfileError } from '../../consts/consts';

const data = {
	username: 'admin',
	age: 22,
	country: Country.Ukraine,
	lastname: 'asd',
	first: 'asf',
	city: 'Kiev',
	currency: Currency.UAH,
};

describe('validateProfileData.test', () => {
	test('success', async () => {
		const result = validateProfileData(data);

		expect(result).toEqual([]);
	});

	test('without first and last name', async () => {
		const result = validateProfileData({ ...data, first: '', lastname: '' });

		expect(result).toEqual([
			ValidateProfileError.INCORRECT_USER_DATA
		]);
	});

	test('without incorrect age', async () => {
		const result = validateProfileData({ ...data, age: undefined });

		expect(result).toEqual([
			ValidateProfileError.INCORRECT_AGE
		]);
	});

	test('without country', async () => {
		const result = validateProfileData({ ...data, country: undefined });

		expect(result).toEqual([
			ValidateProfileError.INCORRECT_COUNTRY
		]);
	});

	test('all fields are incorrect', async () => {
		const result = validateProfileData({});

		expect(result).toEqual([
			ValidateProfileError.INCORRECT_USER_DATA,
			ValidateProfileError.INCORRECT_AGE,
			ValidateProfileError.INCORRECT_COUNTRY,
		]);
	});
});
