import styles from './ingredient-card.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useState, useCallback, useMemo } from 'react';
import { ingredientPropType } from '../../../utils/prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
	setCurrentIngredient,
	clearCurrentIngredient,
} from '../../../services/current-ingredient/actions';
import { useDrag } from 'react-dnd';

const IngredientCard = ({ ingredient }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [{ isDragging }, dragRef] = useDrag({
		type: 'ingredient',
		item: ingredient,
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

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

	const burgerConstructor = useSelector((state) => state.burgerConstructor);

	const calculateCount = useMemo(() => {
		const { bun, ingredients } = burgerConstructor;
		let count = 0;

		if (bun && bun._id === ingredient._id) {
			count = 2;
		} else {
			ingredients.forEach((item) => {
				if (item._id === ingredient._id) {
					count++;
				}
			});
		}

		return count;
	}, [burgerConstructor, ingredient._id]);

	return (
		<>
			<div
				className={`${styles.ingredient} ${isDragging ? styles.dragging : ''}`}
				onClick={openModal}
				onKeyDown={handleKeyDown}
				tabIndex={0}
				role='button'
				aria-label={`Ингредиент ${ingredient.name}`}>
				{calculateCount > 0 && (
					<Counter count={calculateCount} size='default' />
				)}
				<img
					src={ingredient.image}
					alt={ingredient.name}
					ref={dragRef}
					style={{ opacity: isDragging ? 0.5 : 1 }}
				/>
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
