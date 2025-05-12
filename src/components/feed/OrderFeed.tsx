import OrderCard from './OrderCard';
import styles from './OrderFeed.module.css';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { fetchIngredients } from '../../services/burger-ingredients/actions';
import { useEffect } from 'react';
import {
	wsConnectionStart,
	wsConnectionWithAuthStart,
	wsConnectionClosed,
} from '../../services/feed/actions';

const OrderFeed: React.FC<{ isAuth: boolean }> = ({ isAuth }) => {
	const { orders } = useAppSelector((state) => state.feed);
	const { isLoading, error } = useAppSelector(
		(state) => state.burgerIngredients
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchIngredients());
		if (isAuth) {
			dispatch(wsConnectionWithAuthStart());
		} else {
			dispatch(wsConnectionStart());
		}
		return () => {
			dispatch(wsConnectionClosed());
		};
	}, [dispatch, isAuth]);

	if (!orders || isLoading) {
		return (
			<div className={styles.loaderContainer}>
				<p className='text text_type_main-large'>Загрузка...</p>
				<div className={styles.loader}></div>
			</div>
		);
	}

	if (error) return <div>Ошибка: {error}</div>;

	const sortedOrders = orders.sort((a, b) => b.number - a.number);

	return (
		<div className={styles.ordersSection}>
			<h1 className='text text_type_main-large mb-5'>Лента заказов</h1>
			<div className={styles.ordersList + ' custom-scroll'}>
				{sortedOrders.map((order) => (
					<OrderCard key={order._id} order={order} />
				))}
			</div>
		</div>
	);
};

export default OrderFeed;
