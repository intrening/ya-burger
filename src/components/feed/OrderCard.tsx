import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo } from 'react';
import { TOrder, TIngredient } from '../../utils/types';
import { useAppSelector } from '../../services/hooks';
import { getAllIngredients } from '../../services/burger-ingredients/selectors';
import { useNavigate, useLocation } from 'react-router-dom';
import { OrderCardIngredients } from './';

const OrderCard: React.FC<{ order: TOrder }> = ({ order }) => {
	const allIngredients = useAppSelector(getAllIngredients);
	const orderIngredientsIds = order.ingredients;

	const orderIngredients: Array<TIngredient> = useMemo(() => {
		return orderIngredientsIds
			.map((id) => allIngredients.find((i) => i._id === id))
			.filter(Boolean) as TIngredient[];
	}, [allIngredients, orderIngredientsIds]);

	const navigate = useNavigate();
	const location = useLocation();

	const handleClick = () => {
		const isProfile = location.pathname.startsWith('/profile/orders');
		const path = isProfile
			? `/profile/orders/${order.number}`
			: `/feed/${order.number}`;
		navigate(path, { state: { background: location } });
	};

	const orderPrice = orderIngredients.reduce(
		(acc, ingredient) => acc + (ingredient?.price ?? 0),
		0
	);

	return (
		<div
			onClick={handleClick}
			tabIndex={0}
			role='button'
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') handleClick();
			}}
			style={{
				background: '#222',
				borderRadius: 24,
				padding: 20,
				marginBottom: 20,
				minWidth: 400,
				cursor: 'pointer',
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
				<OrderCardIngredients ingredients={orderIngredients} />
				<div
					style={{
						marginLeft: 'auto',
						display: 'flex',
						alignItems: 'center',
						gap: 4,
					}}>
					<span className='text text_type_digits-default'>{orderPrice}</span>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

export default OrderCard;
