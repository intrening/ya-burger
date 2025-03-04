import styles from './ingredient-card.module.css';
import PropTypes from 'prop-types';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';
import { useState } from 'react';

const IngredientCard = ({ ingredient }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openModal();
		}
	};

	return (
		<div
			className={styles.ingredient}
			onClick={openModal}
			onKeyDown={handleKeyDown}
			tabIndex={0}
			role='button'
			aria-label={`Ингредиент ${ingredient.name}`}>
			<Counter count='1' size='default' />
			<img src={ingredient.image} alt={ingredient.name} />
			<div className={`${styles.price} mt-1 mb-1`}>
				<span className='text text_type_digits-default mr-2'>
					{ingredient.price}
				</span>
				<CurrencyIcon type='primary' />
			</div>
			<p className='text text_type_main-default mb-2'>{ingredient.name}</p>
			{isModalOpen && (
				<Modal onClose={closeModal}>
					<IngredientDetails ingredient={ingredient} />
				</Modal>
			)}
		</div>
	);
};

IngredientCard.propTypes = {
	ingredient: PropTypes.shape({
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		image: PropTypes.string.isRequired,
	}).isRequired,
};

export default IngredientCard;
