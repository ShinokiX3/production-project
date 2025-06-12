import { render, screen } from '@testing-library/react';
import { Modal } from './Modal';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { toggleFeatures } from '@/shared/features';

// Mock dependencies
jest.mock('@/shared/lib/classNames/classNames', () => ({
    classNames: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

jest.mock('@/shared/lib/hooks/useModal/useModal', () => ({
    useModal: jest.fn(),
}));

jest.mock('../Portal/Portal', () => ({
    Portal: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="portal">{children}</div>
    ),
}));

jest.mock('../Overlay/Overlay', () => ({
    Overlay: ({ onClick }: { onClick: () => void }) => (
        <div data-testid="overlay" onClick={onClick}>
            Overlay
        </div>
    ),
}));

jest.mock('@/shared/features', () => ({
    toggleFeatures: jest.fn(() => 'mocked-feature-class'),
}));

// Mock CSS modules
jest.mock('./Modal.module.scss', () => ({
    Modal: 'modal-class',
    opened: 'opened-class',
    is_closing: 'closing-class',
    content: 'content-class',
    new: 'new-class',
    old: 'old-class',
}));

const mockUseModal = useModal as jest.MockedFunction<typeof useModal>;
const mockClassNames = classNames as jest.MockedFunction<typeof classNames>;
const mockToggleFeatures = toggleFeatures as jest.MockedFunction<
    typeof toggleFeatures
>;

describe('Modal', () => {
    const defaultUseModalReturn = {
        close: jest.fn(),
        isClosing: false,
        isMounted: true,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockUseModal.mockReturnValue(defaultUseModalReturn);
        mockClassNames.mockImplementation((...args) =>
            args.filter(Boolean).join(' '),
        );
        mockToggleFeatures.mockReturnValue('mocked-feature-class');

        // Mock document.getElementById
        Object.defineProperty(document, 'getElementById', {
            value: jest.fn(() => null),
            writable: true,
        });
    });

    describe('Basic rendering', () => {
        test('should render with basic props', () => {
            render(<Modal isOpen>Test Content</Modal>);

            expect(screen.getByTestId('portal')).toBeInTheDocument();
            expect(screen.getByTestId('overlay')).toBeInTheDocument();
            expect(screen.getByText('Test Content')).toBeInTheDocument();
        });

        test('should apply correct CSS classes', () => {
            render(
                <Modal isOpen className="custom-class">
                    Content
                </Modal>,
            );

            expect(mockClassNames).toHaveBeenCalledWith(
                'modal-class',
                { 'opened-class': true, 'closing-class': false },
                ['custom-class', 'app_modal', 'mocked-feature-class'],
            );
        });

        test('should pass correct parameters to useModal', () => {
            const onCloseMock = jest.fn();
            render(
                <Modal isOpen onClose={onCloseMock}>
                    Content
                </Modal>,
            );

            expect(mockUseModal).toHaveBeenCalledWith({
                animationDelay: 300,
                isOpen: true,
                onClose: onCloseMock,
            });
        });
    });

    describe('Modal states', () => {
        test('should apply opened class when isOpen=true', () => {
            mockUseModal.mockReturnValue({
                ...defaultUseModalReturn,
                isClosing: false,
            });

            render(<Modal isOpen>Content</Modal>);

            expect(mockClassNames).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({ 'opened-class': true }),
                expect.any(Array),
            );
        });

        test('should apply is_closing class when isClosing=true', () => {
            mockUseModal.mockReturnValue({
                ...defaultUseModalReturn,
                isClosing: true,
            });

            render(<Modal isOpen>Content</Modal>);

            expect(mockClassNames).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({ 'closing-class': true }),
                expect.any(Array),
            );
        });

        test('should not apply opened class when isOpen=false', () => {
            render(<Modal isOpen={false}>Content</Modal>);

            expect(mockClassNames).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({ 'opened-class': false }),
                expect.any(Array),
            );
        });
    });

    describe('Lazy loading', () => {
        test('should return null if lazy=true and isMounted=false', () => {
            mockUseModal.mockReturnValue({
                ...defaultUseModalReturn,
                isMounted: false,
            });

            const { container } = render(<Modal lazy>Content</Modal>);

            expect(container.firstChild).toBeNull();
        });

        test('should render if lazy=true and isMounted=true', () => {
            mockUseModal.mockReturnValue({
                ...defaultUseModalReturn,
                isMounted: true,
            });

            render(<Modal lazy>Content</Modal>);

            expect(screen.getByText('Content')).toBeInTheDocument();
        });

        test('should render if lazy=false regardless of isMounted', () => {
            mockUseModal.mockReturnValue({
                ...defaultUseModalReturn,
                isMounted: false,
            });

            render(<Modal lazy={false}>Content</Modal>);

            expect(screen.getByText('Content')).toBeInTheDocument();
        });

        test('should render if lazy is not specified', () => {
            mockUseModal.mockReturnValue({
                ...defaultUseModalReturn,
                isMounted: false,
            });

            render(<Modal>Content</Modal>);

            expect(screen.getByText('Content')).toBeInTheDocument();
        });
    });

    describe('Close handling', () => {
        test('should call close when overlay is clicked', () => {
            const closeMock = jest.fn();
            mockUseModal.mockReturnValue({
                ...defaultUseModalReturn,
                close: closeMock,
            });

            render(<Modal isOpen>Content</Modal>);

            const overlay = screen.getByTestId('overlay');
            overlay.click();

            expect(closeMock).toHaveBeenCalledTimes(1);
        });
    });

    describe('Feature flags', () => {
        test('should call toggleFeatures with correct parameters', () => {
            render(<Modal>Content</Modal>);

            expect(mockToggleFeatures).toHaveBeenCalledWith({
                name: 'isAppRedesigned',
                on: expect.any(Function),
                off: expect.any(Function),
            });
        });

        test('on and off functions should return correct classes', () => {
            render(<Modal>Content</Modal>);

            const toggleFeaturesCall = mockToggleFeatures.mock.calls[0][0];
            expect(toggleFeaturesCall.on()).toBe('new-class');
            expect(toggleFeaturesCall.off()).toBe('old-class');
        });
    });

    describe('Portal', () => {
        test('should use app element if it exists', () => {
            const mockAppElement = document.createElement('div');
            mockAppElement.id = 'app';

            jest.spyOn(document, 'getElementById').mockReturnValue(
                mockAppElement,
            );

            render(<Modal>Content</Modal>);

            expect(document.getElementById).toHaveBeenCalledWith('app');
        });

        test('should use document.body if app element does not exist', () => {
            jest.spyOn(document, 'getElementById').mockReturnValue(null);

            render(<Modal>Content</Modal>);

            expect(document.getElementById).toHaveBeenCalledWith('app');
            // Portal should receive document.body as fallback
        });
    });

    describe('Children rendering', () => {
        test('should render passed children', () => {
            render(
                <Modal>
                    <div>Child 1</div>
                    <span>Child 2</span>
                </Modal>,
            );

            expect(screen.getByText('Child 1')).toBeInTheDocument();
            expect(screen.getByText('Child 2')).toBeInTheDocument();
        });

        test('should work without children', () => {
            render(<Modal />);

            expect(screen.getByTestId('portal')).toBeInTheDocument();
        });
    });

    describe('Integration tests', () => {
        test('should work correctly with all props simultaneously', () => {
            const onCloseMock = jest.fn();
            const closeMock = jest.fn();

            mockUseModal.mockReturnValue({
                close: closeMock,
                isClosing: true,
                isMounted: true,
            });

            render(
                // eslint-disable-next-line react/jsx-max-props-per-line
                <Modal className="test-class" isOpen onClose={onCloseMock} lazy>
                    <div>Complex Content</div>
                </Modal>,
            );

            // Check that component renders
            expect(screen.getByText('Complex Content')).toBeInTheDocument();

            // Check correct useModal call
            expect(mockUseModal).toHaveBeenCalledWith({
                animationDelay: 300,
                isOpen: true,
                onClose: onCloseMock,
            });

            // Check classes
            expect(mockClassNames).toHaveBeenCalledWith(
                'modal-class',
                { 'opened-class': true, 'closing-class': true },
                ['test-class', 'app_modal', 'mocked-feature-class'],
            );
        });
    });
});
