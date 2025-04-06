import styles from './ingredient-card.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { TIngredient } from '../../../utils/types';
import { TStore } from '../../../services/types';

const IngredientCard: React.FC<{ ingredient: TIngredient }> = ({
	ingredient,
}) => {
	const location = useLocation();
	const [{ isDragging }, dragRef] = useDrag({
		type: 'ingredient',
		item: ingredient,
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	const burgerConstructor = useSelector(
		(state: TStore) => state.burgerConstructor
	);

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
			<Link
				className={`${styles.ingredient} ${isDragging ? styles.dragging : ''}`}
				to={`/ingredients/${ingredient._id}`}
				state={{ background: location }}
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
			</Link>
		</>
	);
};

export default IngredientCard;
