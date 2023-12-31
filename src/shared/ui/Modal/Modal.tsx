import { classNames } from 'shared/lib/classNames/classNames';
import {
	useCallback, useEffect, useRef, useState
} from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import cls from './Modal.module.scss';
import { Portal } from '../Portal/Portal';

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

	const [isClosing, setIsClosing] = useState<boolean>(false);
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

	useEffect(() => { if (isOpen) setIsMounted(true); }, [isOpen]);

	const closeHandler = useCallback(() => {
		setIsClosing(true); timerRef.current = setTimeout(() => {
			onClose(); setIsClosing(false);
		}, ANIMATION_DELAY);
	}, [onClose]);

	const contentHandler = (e: React.MouseEvent) => e.stopPropagation();

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') closeHandler();
	}, [closeHandler]);

	useEffect(() => {
		if (isOpen) window.addEventListener('keydown', onKeyDown);

		return () => {
			clearTimeout(timerRef.current);
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen, onKeyDown]);

	const mods: Record<string, boolean> = {
		[cls.opened]: isOpen,
		[cls.is_closing]: isClosing,
	};

	if (lazy && !isMounted) return null;

	return (
		<Portal>
			<div className={classNames(cls.Modal, mods, [className])}>
				<div className={cls.overlay} onClick={closeHandler}>
					<div className={cls.content} onClick={contentHandler}>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	);
};
