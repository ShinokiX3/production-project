describe('Proceed to Articles Page', () => {
	beforeEach(() => {
		cy.login().then((data) => {
			cy.visit('/articles');
		});
	});

	it('Articles Page is loaded', () => {
		cy.testId('ArticleList').should('exist');
		cy.testId('ArticleListItem').should('have.length.greaterThan', 3);
	});

	it('Articles Page is loaded on Stab', () => {
		cy.intercept('GET', '**/articles', { fixture: 'articles.json' });
		cy.testId('ArticleList').should('exist');
		cy.testId('ArticleListItem').should('have.length.greaterThan', 3);
	});

	it.skip('Skip Test', () => {
		cy.testId('ArticleList').should('exist');
		cy.testId('skip').should('exist');
	});
});
