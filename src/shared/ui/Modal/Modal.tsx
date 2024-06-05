import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import cls from './Modal.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

interface ModalProps {
    className?: string;
    children?: React.ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
	lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
	const {
		className, children, isOpen, onClose, lazy
	} = props;

	const { close, isClosing, isMounted } = useModal({ animationDelay: ANIMATION_DELAY, isOpen, onClose });

	const mods: Mods = {
		[cls.opened]: isOpen,
		[cls.is_closing]: isClosing,
	};

	if (lazy && !isMounted) return null;

	return (
		<Portal>
			<div className={classNames(cls.Modal, mods, [className, 'app_modal'])}>
				<Overlay onClick={close} />
				<div className={cls.content}>
					{children}
				</div>
			</div>
		</Portal>
	);
};
