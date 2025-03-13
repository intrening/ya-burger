import styles from './ingredient-card.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useState, useCallback } from 'react';
import { ingredientPropType } from '../../../utils/prop-types';
import { useDispatch } from 'react-redux';
import {
	setCurrentIngredient,
	clearCurrentIngredient,
} from '../../../services/current-ingredient/actions';

const IngredientCard = ({ ingredient }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const dispatch = useDispatch();

	const openModal = useCallback(() => {
		setIsModalOpen(true);
		dispatch(setCurrentIngredient(ingredient));
	}, [dispatch, ingredient]);

	const closeModal = useCallback(() => {
		setIsModalOpen(false);
		dispatch(clearCurrentIngredient());
	}, [dispatch]);

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openModal();
		}
	};

	return (
		<>
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
			</div>
			{isModalOpen && (
				<Modal header='Детали ингредиента' onClose={closeModal}>
					<IngredientDetails ingredient={ingredient} />
				</Modal>
			)}
		</>
	);
};

IngredientCard.propTypes = {
	ingredient: ingredientPropType.isRequired,
};

export default IngredientCard;
