/* eslint-disable @typescript-eslint/no-namespace */

export const setRate = (starsCount = 5, feedback = 'feedback') => {
	cy.testId(`StarRating.${starsCount}`).click();
	cy.testId('RatingCard.Input').type(feedback);
	cy.testId('RatingCard.Save').click();
};

declare global {
    namespace Cypress {
        interface Chainable {
            setRate(starsCount: number, feedback: string): Chainable<void>
        }
    }
}
