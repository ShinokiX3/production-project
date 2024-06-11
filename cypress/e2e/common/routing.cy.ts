import { testId } from 'cypress/helpers/selectByTestId';

describe('Routing', () => {
	describe('UnAuthorized', () => {
		it('Proceed to Main Page', () => {
			cy.visit('/');
			cy.get(testId('MainPage')).should('exist');
		});

		it('Proceed to Profile Page', () => {
			cy.visit('/profile/1');
			cy.get(testId('MainPage')).should('exist');
		});

		it('Proceed to non-existent Page', () => {
			cy.visit('/non-existent');
			cy.get(testId('NotFoundPage')).should('exist');
		});
	});

	describe('Authorized', () => {
		beforeEach(() => {
			cy.login('testuser', '123');
		});

		it('Proceed to Profile Page', () => {
			cy.visit('/profile/1');
			cy.get(testId('ProfilePage')).should('exist');
		});

		it('Proceed to Articles Page', () => {
			cy.visit('/articles');
			cy.get(testId('ArticlesPage')).should('exist');
		});
	});
});
