let profileId = '';

describe('User enter the Profile Page', () => {
	beforeEach(() => {
		cy.login().then((data) => {
			profileId = data.id;
			cy.visit(`/profile/${data.id}`);
		});
	});

	afterEach(() => {
		cy.resetProfile(profileId);
	});

	it('Profile loaded', () => {
		cy.testId('ProfileCard.Firstname').should('have.value', 'Test');
	});

	it('Press Edit', () => {
		const firstname = 'TestEdited';
		const lastname = 'UserEdited';

		cy.updateProfile(firstname, lastname);

		cy.testId('ProfileCard.Firstname').should('have.value', firstname);
	});
});
