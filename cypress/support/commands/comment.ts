/* eslint-disable @typescript-eslint/no-namespace */

export const addComment = (text: string) => {
	cy.testId('AddCommentForm.Input').type(text);
	cy.testId('AddCommentForm.Button').click();
};

declare global {
	namespace Cypress {
		interface Chainable {
			addComment(text: string): Chainable<void>,
		}
	}
}
