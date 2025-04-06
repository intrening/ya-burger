import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

const Modal: React.FC<{
	children: React.ReactNode;
	header?: string;
	onClose: () => void;
}> = ({ children, header = '', onClose }) => {
	useEffect(() => {
		const handleEscKeydown = (evt: KeyboardEvent) => {
			if (evt.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscKeydown);

		return () => {
			document.removeEventListener('keydown', handleEscKeydown);
		};
	}, [onClose]);

	const handleOverlayClick = (
		evt: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
	) => {
		if ('button' in evt && evt.target === evt.currentTarget) {
			onClose();
		}
	};

	return createPortal(
		<>
			<ModalOverlay onClick={handleOverlayClick} />
			<div className={styles.modal}>
				<div className={styles.header}>
					<h2 className='text text_type_main-large'>{header}</h2>
					<button
						className={styles.closeButton}
						onClick={onClose}
						type='button'>
						<CloseIcon type='primary' />
					</button>
				</div>
				<div className={styles.content}>{children}</div>
			</div>
		</>,
		modalRoot as HTMLElement
	);
};

export default Modal;
