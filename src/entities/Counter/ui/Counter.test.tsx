import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { userEvent } from '@storybook/testing-library';
import { Counter } from './Counter';

describe('counter', () => {
	test('counter value render', () => {
		componentRender(<Counter />, {
			initialState: { counter: { value: 10 } }
		});
		expect(screen.getByTestId('value-title')).toHaveTextContent('10');
	});

	test('counter value increment', () => {
		componentRender(<Counter />, {
			initialState: { counter: { value: 10 } }
		});
		userEvent.click(screen.getByTestId('increment-bttn'));
		expect(screen.getByTestId('value-title')).toHaveTextContent('11');
	});

	test('counter value decrement', () => {
		componentRender(<Counter />, {
			initialState: { counter: { value: 10 } }
		});
		userEvent.click(screen.getByTestId('decrement-bttn'));
		expect(screen.getByTestId('value-title')).toHaveTextContent('9');
	});
});
