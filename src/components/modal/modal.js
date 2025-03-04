import { useEffect, createPortal } from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ModalOverlay from './modal-overlay';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ children, onClose }) => {
	useEffect(() => {
		const handleEscKeydown = (event) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscKeydown);

		return () => {
			document.removeEventListener('keydown', handleEscKeydown);
		};
	}, [onClose]);

	return createPortal(
		<>
			<div className={styles.modal}>
				<div className={styles.closeButton}>
					<CloseIcon type='primary' onClick={onClose} />
				</div>
				<div className={styles.content}>{children}</div>
			</div>
			<ModalOverlay onClick={onClose} />
		</>,
		modalRoot
	);
};

Modal.propTypes = {
	children: PropTypes.node.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default Modal;
