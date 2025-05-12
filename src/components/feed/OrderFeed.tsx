import OrderCard from './OrderCard';
import styles from './OrderFeed.module.css';
import { TOrder } from '../../types';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { fetchIngredients } from '../../services/burger-ingredients/actions';
import { useEffect } from 'react';

const OrderFeed: React.FC<{ orders: Array<TOrder> }> = ({ orders }) => {
	const { isLoading, error } = useAppSelector(
		(state) => state.burgerIngredients
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	if (isLoading) return <div>Загрузка...</div>;
	if (error) return <div>Ошибка: {error}</div>;

	return (
		<div className={styles.ordersSection}>
			<h1 className='text text_type_main-large mb-5'>Лента заказов</h1>
			<div className={styles.ordersList + ' custom-scroll'}>
				{orders.map((order) => (
					<OrderCard key={order._id} order={order} />
				))}
			</div>
		</div>
	);
};

export default OrderFeed;
