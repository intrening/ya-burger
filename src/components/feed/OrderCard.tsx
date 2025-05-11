import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { TOrder } from '../../utils/types';
import { getIngredientsById } from '../../services/burger-ingredients/selectors';
import { useAppSelector } from '../../services/hooks';

const OrderCardIngredients: React.FC<{ ingredients: string[] }> = ({
	ingredients,
}) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
			{ingredients.slice(0, 5).map((img, idx) => (
				<img
					key={idx}
					src={img}
					alt='ingredient'
					style={{
						width: 40,
						height: 40,
						borderRadius: '50%',
						border: '2px solid #4C4CFF',
						marginLeft: idx === 0 ? 0 : -12,
						background: '#191922',
					}}
				/>
			))}
			{ingredients.length > 5 && (
				<span style={{ marginLeft: 4, color: '#8585ad', fontSize: 16 }}>
					+{ingredients.length - 5}
				</span>
			)}
		</div>
	);
};

const OrderCard: React.FC<{ order: TOrder }> = ({ order }) => {
	const ingredientsById = useAppSelector(getIngredientsById);

	const ingredientsInOrder = order.ingredients.map(
		(ingredient) => ingredientsById[ingredient]
	);

	const price = ingredientsInOrder.reduce(
		(acc, ingredient) => acc + ingredient.price,
		0
	);

	return (
		<div
			style={{
				background: '#222',
				borderRadius: 24,
				padding: 20,
				marginBottom: 20,
				minWidth: 400,
			}}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: 8,
				}}>
				<span className='text text_type_digits-default'>
					#{order.number.toString().padStart(6, '0')}
				</span>
				<span className='text text_type_main-default text_color_inactive'>
					{order.createdAt}
				</span>
			</div>
			<div className='text text_type_main-medium mb-2'>{order.name}</div>
			<div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
				<OrderCardIngredients ingredients={order.ingredients} />
				<div
					style={{
						marginLeft: 'auto',
						display: 'flex',
						alignItems: 'center',
						gap: 4,
					}}>
					<span className='text text_type_digits-default'>{price}</span>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

export default OrderCard;
