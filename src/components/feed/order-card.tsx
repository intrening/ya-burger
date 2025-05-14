import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo } from 'react';
import { TOrder, TIngredient } from '../../types';
import { useNavigate, useLocation } from 'react-router-dom';
import { OrderCardIngredients } from '.';
import styles from './feed.module.css';
import { getAllIngredients } from '../../services/burger-ingredients/selectors';
import { useAppSelector } from '../../services/hooks';

type TOrderCardProps = {
	order: TOrder;
};

const OrderCard: React.FC<TOrderCardProps> = ({ order }) => {
	const orderIngredientsIds = order.ingredients;
	const allIngredients = useAppSelector(getAllIngredients);

	const orderIngredients: Array<TIngredient> = useMemo(() => {
		return orderIngredientsIds
			.map((id) => allIngredients.find((i) => i._id === id))
			.filter(Boolean) as TIngredient[];
	}, [allIngredients, orderIngredientsIds]);

	const orderPrice = orderIngredients.reduce(
		(acc, ingredient) => acc + (ingredient?.price ?? 0),
		0
	);

	const navigate = useNavigate();
	const location = useLocation();

	const handleClick = () => {
		const isProfile = location.pathname.startsWith('/profile/orders');
		const path = isProfile
			? `/profile/orders/${order.number}`
			: `/feed/${order.number}`;
		navigate(path, { state: { background: location } });
	};

	return (
		<div
			className={styles.orderCard}
			onClick={handleClick}
			tabIndex={0}
			role='button'
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') handleClick();
			}}>
			<div className={styles.orderCardHeader}>
				<span className='text text_type_digits-default'>
					#{order.number.toString().padStart(6, '0')}
				</span>
				<span className='text text_type_main-default text_color_inactive'>
					{new Date(order.createdAt).toLocaleString('ru-RU')}
				</span>
			</div>
			<div
				className={'text text_type_main-medium mb-2 ' + styles.orderCardName}>
				{order.name}
			</div>
			<div className={styles.orderCardRow}>
				<OrderCardIngredients ingredients={orderIngredients} />
				<div className={styles.orderCardPrice}>
					<span className='text text_type_digits-default'>{orderPrice}</span>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

export default OrderCard;
