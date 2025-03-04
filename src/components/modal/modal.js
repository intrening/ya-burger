import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

function Modal({ children, header, onClose }) {
	useEffect(() => {
		const handleEscKeydown = (evt) => {
			if (evt.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscKeydown);

		return () => {
			document.removeEventListener('keydown', handleEscKeydown);
		};
	}, [onClose]);

	const handleOverlayClick = (evt) => {
		if (evt.target === evt.currentTarget) {
			onClose();
		}
	};

	return ReactDOM.createPortal(
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
		modalRoot
	);
}

Modal.propTypes = {
	children: PropTypes.node.isRequired,
	header: PropTypes.string,
	onClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
	header: '',
};

export default Modal;
