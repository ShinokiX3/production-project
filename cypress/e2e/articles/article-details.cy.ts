let currentArticleId = '';

describe('Proceed to particular Article Details Page', () => {
	beforeEach(() => {
		cy.login();
		cy.createArticle().then((article) => {
			currentArticleId = article.id ?? '777';
			cy.visit(`/articles/${currentArticleId}`);
		});
	});

	afterEach(() => {
		cy.removeArticle(currentArticleId);
	});

	it.skip('Watch Article Details Info', () => {
		cy.testId('ArticleDetails.Info').should('exist');
	});

	it.skip('Watch Recommendation List', () => {
		cy.testId('ArticleRecommendationList').should('exist');
	});

	it.skip('Leave Comment', () => {
		cy.testId('ArticleDetails.Info');
		cy.testId('AddCommentForm').should('exist');
		cy.testId('AddCommentForm').scrollIntoView();
		cy.addComment('Comment');
		cy.testId('CommentCard.Content').should('have.length', 1);
	});

	it('Set Rating to Article', () => {
		cy.intercept('GET', '**/article/*', { fixture: 'article-details.json' });
		cy.testId('ArticleDetails.Info');
		cy.testId('RatingCard').should('exist');
		cy.testId('RatingCard').scrollIntoView();
		cy.setRate(4, 'Feedback');
		cy.get('[data-selected=true]').should('have.length', 4);
	});
});
