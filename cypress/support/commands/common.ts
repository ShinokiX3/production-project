/* eslint-disable @typescript-eslint/no-namespace */
import { testId as selectTestId } from 'cypress/helpers/selectByTestId';
import { User } from '../../../src/entities/User/model/types/user';
import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage';

export const login = (username = 'testuser', password = '123') => cy.request({
	method: 'POST',
	url: 'http://localhost:8000/login',
	body: {
		username,
		password
	}
}).then(({ body }) => {
	window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));

	return body;
});

export const testId = (testId: string) => cy.get(selectTestId(testId));

declare global {
	namespace Cypress {
		interface Chainable {
			login(username?: string, password?: string): Chainable<User>
			testId(testId: string): Chainable<JQuery<HTMLElement>>
		}
	}
}
