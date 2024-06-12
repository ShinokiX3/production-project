/* eslint-disable @typescript-eslint/no-namespace */

import * as commons from './commands/common';
import * as profile from './commands/profile';
import * as article from './commands/article';
import * as comment from './commands/comment';
import * as rating from './commands/rating';

Cypress.Commands.addAll(commons);
Cypress.Commands.addAll(profile);
Cypress.Commands.addAll(article);
Cypress.Commands.addAll(comment);
Cypress.Commands.addAll(rating);
// Cypress.Commands.overwrite('intercept', () => {
// 	const { FIXTURE_MODE } = process.env;
// 	const fixtureName = req.METHOD = req.url + hash(req.body);

// 	if (FIXTURE_MODE === 'READ') {
// 		readFixture(fixtureName);
// 	}
// 	if (FIXTURE_MODE === 'WRITE') {
// 		createFixture(fixtureName, req.body);
// 	}
//  if (FIXTURE_MODE = 'API') {}
// });

export {};
