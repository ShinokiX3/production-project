/* eslint-disable @typescript-eslint/no-namespace */
import { User } from '../../../src/entities/User/model/types/user';

export const updateProfile = (firstname: string, lastname: string) => {
	cy.testId('EditableProfileCardHeader.Edit').click();
	cy.testId('ProfileCard.Firstname').clear().type(firstname);
	cy.testId('EditableProfileCardHeader.Save').click();
};

export const resetProfile = (profileId: string) => cy.request({
	method: 'PUT',
	url: `http://localhost:8000/profile/${profileId}`,
	headers: {
		Authorization: 'Bearer'
	},
	body: {
		id: profileId,
		first: 'Test',
		lastname: 'User',
		age: 22,
		currency: 'UAH',
		country: 'Ukraine',
		city: 'Kiyv',
		username: 'testuser',
		avatar: 'https://i.pinimg.com/564x/0a/e1/63/0ae163d22f24d5c264664460c3f18ee5.jpg'
	}
});

declare global {
	namespace Cypress {
		interface Chainable {
			updateProfile(firstname: string, lastname: string): Chainable<User>,
			resetProfile(profileId: string): Chainable<User>,
		}
	}
}
