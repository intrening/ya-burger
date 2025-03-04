import React from 'react';
import styles from './modal.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ onClick }) => {
	return (
		<div
			className={styles.overlay}
			onClick={onClick}
			onKeyDown={onClick}
			role='button'
			tabIndex={0}></div>
	);
};

ModalOverlay.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
