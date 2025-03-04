import React from 'react';
import styles from './modal.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ onClick }) => {
	const handleClick = (e) => {
		e.stopPropagation();
		onClick(e);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onClick(e);
		}
	};

	return (
		<div
			className={styles.overlay}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			role='button'
			tabIndex={0}></div>
	);
};

ModalOverlay.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
