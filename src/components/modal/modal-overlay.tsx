import styles from './modal.module.css';

const ModalOverlay = ({
	onClick,
}: {
	onClick: (
		e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
	) => void;
}) => {
	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		onClick(e);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
export default ModalOverlay;
