import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../services/hooks';
import { fetchOrderDetailsByNumber } from '../services/order/actions';
import { getAllIngredients } from '../services/burger-ingredients/selectors';
import styles from './ingredient-details.module.css';
import OrderIngredientsList from '../components/order-details/order-ingredients-list';
import OrderTotalPrice from '../components/order-details/order-total-price';
import { TIngredient } from '../types';
import Loader from '../components/loader/loader';

const OrderDetailsPage: React.FC = () => {
	const { number } = useParams<{ number: string }>();
	const dispatch = useAppDispatch();

	const order = useAppSelector((state) => {
		return (
			state.feed.orders.find((o) => o.number.toString() === number) ||
			state.order.orderDetails
		);
	});
	const orderLoading = useAppSelector((state) => state.order.loading);
	const orderError = useAppSelector((state) => state.order.error);

	const allIngredients = useAppSelector(getAllIngredients);
	const ingredientsLoading = useAppSelector(
		(state) => state.burgerIngredients.isLoading
	);
	const ingredientsError = useAppSelector(
		(state) => state.burgerIngredients.error
	);

	useEffect(() => {
		if (!order && number) {
			dispatch(fetchOrderDetailsByNumber(number));
		}
	}, [dispatch, number, order]);

	if (orderLoading || ingredientsLoading) return <Loader text='Загрузка...' />;
	if (orderError) return <div>Ошибка заказа: {orderError}</div>;
	if (ingredientsError)
		return <div>Ошибка ингредиентов: {ingredientsError}</div>;
	if (!order) return <div>Заказ не найден</div>;

	const ingredientCount: Record<string, number> = {};
	order.ingredients.forEach((id) => {
		ingredientCount[id] = (ingredientCount[id] || 0) + 1;
	});

	const orderIngredients = order.ingredients
		.map((id) => allIngredients.find((ing) => ing._id === id))
		.filter(Boolean) as TIngredient[];

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
			<OrderIngredientsList
				ingredients={orderIngredients}
				ingredientCount={ingredientCount}
			/>
			<OrderTotalPrice
				ingredients={orderIngredients}
				ingredientCount={ingredientCount}
				createdAt={order.createdAt}
			/>
		</div>
	);
};

export default OrderDetailsPage;
