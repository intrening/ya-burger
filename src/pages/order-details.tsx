import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TIngredient } from '../utils/types';
import { useAppDispatch, useAppSelector } from '../services/hooks';
import styles from './ingredient-details.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import feedStyles from '../components/feed/OrderFeed.module.css';
import { orders } from '../config';
import { getAllIngredients } from '../services/burger-ingredients/selectors';
import { fetchIngredients } from '../services/burger-ingredients/actions';

const OrderDetailsPage: React.FC = () => {
	const { number } = useParams<{ number: string }>();
	const order = orders.find((o) => o.number.toString() === number);

	const { isLoading, error } = useAppSelector(
		(state) => state.burgerIngredients
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);
	const allIngredients = useAppSelector(getAllIngredients);

	if (isLoading) return <div>Загрузка...</div>;
	if (error) return <div>Ошибка: {error}</div>;

	if (!order) {
		return (
			<div className={styles.container}>
				<p className='text text_type_main-medium text_color_error'>
					Заказ не найден
				</p>
			</div>
		);
	}

	const orderIngredients = order.ingredients
		.map((id) => allIngredients.find((ing) => ing._id === id))
		.filter(Boolean) as TIngredient[];

	const ingredientCount: Record<string, number> = {};
	order.ingredients.forEach((id) => {
		ingredientCount[id] = (ingredientCount[id] || 0) + 1;
	});

	const totalPrice = orderIngredients.reduce(
		(sum, ing) => sum + ing.price * ingredientCount[ing._id],
		0
	);

	return (
		<div className={styles.container}>
			<p
				className='text text_type_digits-default mb-2'
				style={{ textAlign: 'center' }}>
				#{order.number.toString().padStart(6, '0')}
			</p>
			<h2
				className='text text_type_main-medium mb-2'
				style={{ textAlign: 'center' }}>
				{order.name}
			</h2>
			<p
				className='text text_type_main-default mb-6'
				style={{ color: '#00fff0', textAlign: 'center' }}>
				{order.status === 'done' ? 'Выполнен' : 'Готовится'}
			</p>
			<h3 className='text text_type_main-medium mb-4'>Состав:</h3>
			<ul
				className={feedStyles.ordersList}
				style={{ maxHeight: 320, marginBottom: 32 }}>
				{Object.keys(ingredientCount).map((id) => {
					const ing = allIngredients.find((i) => i._id === id);
					if (!ing) return null;
					return (
						<li
							key={id}
							style={{
								display: 'flex',
								alignItems: 'center',
								marginBottom: 16,
							}}>
							<img
								src={ing.image}
								alt={ing.name}
								style={{
									width: 64,
									height: 64,
									borderRadius: '50%',
									marginRight: 16,
									background: '#222',
								}}
							/>
							<span className='text text_type_main-default' style={{ flex: 1 }}>
								{ing.name}
							</span>
							<span
								className='text text_type_digits-default'
								style={{ marginLeft: 16 }}>
								{ingredientCount[id]} x {ing.price}
							</span>
							<CurrencyIcon type='primary' />
						</li>
					);
				})}
			</ul>
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginTop: 'auto',
				}}>
				<span className='text text_type_main-default text_color_inactive'>
					{order.createdAt}
				</span>
				<span
					className='text text_type_digits-default'
					style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
					{totalPrice} <CurrencyIcon type='primary' />
				</span>
			</div>
		</div>
	);
};

export default OrderDetailsPage;
