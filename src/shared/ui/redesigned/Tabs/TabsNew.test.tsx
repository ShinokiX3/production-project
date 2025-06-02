import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Tabs, TabItem } from './TabsNew';

describe('Tabs', () => {
    const defaultTabs: TabItem[] = [
        { value: 'tab1', content: 'Tab 1 Content' },
        { value: 'tab2', content: 'Tab 2 Content' },
        { value: 'tab3', content: 'Tab 3 Content' },
    ];

    it('renders tabs correctly', () => {
        render(<Tabs tabs={defaultTabs} selected="" onTabClick={() => {}} />);
        expect(screen.getAllByRole('tab')).toHaveLength(defaultTabs.length);
    });

    it('calls onTabClick when a tab is clicked', () => {
        const mockOnTabClick = jest.fn();
        render(
            <Tabs tabs={defaultTabs} selected="" onTabClick={mockOnTabClick} />,
        );
        fireEvent.click(screen.getByText('Tab 2 Content'));
        expect(mockOnTabClick).toHaveBeenCalledWith({
            value: 'tab2',
            content: 'Tab 2 Content',
        });
    });

    it('displays the selected tab correctly', () => {
        render(<Tabs tabs={defaultTabs} selected="" onTabClick={() => {}} />);
        expect(screen.getByText('Tab 2 Content')).toHaveClass('selected');
    });

    it('renders tabs in different direction', () => {
        const { container } = render(
            <Tabs
                tabs={defaultTabs}
                selected=""
                onTabClick={() => {}}
                direction="column"
            />,
        );
        expect(container.firstChild).toHaveClass('Tabs-direction-column');
    });
});
