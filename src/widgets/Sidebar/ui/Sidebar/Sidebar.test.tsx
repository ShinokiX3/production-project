import { fireEvent, screen } from '@testing-library/react';
import {
	renderWithTranslation
} from 'shared/lib/tests/renderWithTranslation/renderWithTranslation';
import { Sidebar } from './Sidebar';

describe('sidebar', () => {
	test('sidebar render', () => {
		renderWithTranslation(<Sidebar />);
		expect(screen.getByTestId('sidebar')).toBeInTheDocument();
	});

	test('toggle test', () => {
		renderWithTranslation(<Sidebar />);
		const toggleBttn = screen.getByTestId('sidebar-toggle');
		expect(screen.getByTestId('sidebar')).toBeInTheDocument();
		fireEvent.click(toggleBttn);
		expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
	});
});
