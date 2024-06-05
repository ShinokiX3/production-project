import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Sidebar } from './Sidebar';

describe('sidebar', () => {
	test('sidebar render', () => {
		componentRender(<Sidebar />);
		expect(screen.getByTestId('sidebar')).toBeInTheDocument();
	});

	test('toggle test', () => {
		componentRender(<Sidebar />);
		const toggleBttn = screen.getByTestId('sidebar-toggle');
		expect(screen.getByTestId('sidebar')).toBeInTheDocument();
		fireEvent.click(toggleBttn);
		expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
	});
});
