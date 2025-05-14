import OrderCard from './order-card';
import styles from './feed.module.css';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { useEffect } from 'react';
import {
	wsConnectionStart,
	wsConnectionWithAuthStart,
	wsConnectionClosed,
} from '../../services/feed/actions';
import { getAllIngredients } from '../../services/burger-ingredients/selectors';
import Loader from '../loader/loader';

const OrderFeed: React.FC<{ isAuth: boolean }> = ({ isAuth }) => {
	const { orders } = useAppSelector((state) => state.feed);
	const { isLoading, error } = useAppSelector(
		(state) => state.burgerIngredients
	);
	const allIngredients = useAppSelector(getAllIngredients);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isAuth) {
			dispatch(wsConnectionWithAuthStart());
		} else {
			dispatch(wsConnectionStart());
		}
		return () => {
			dispatch(wsConnectionClosed());
		};
	}, [dispatch, isAuth, allIngredients]);

	const sortedOrders = orders.sort((a, b) => b.number - a.number);

	if (isLoading || allIngredients.length === 0 || orders.length === 0) {
		return <Loader />;
	}

	if (error) {
		return (
			<section className={styles.burgerIngredients}>
				<p className='text text_type_main-large mb-5'>
					Не удалось загрузить заказы
				</p>
				<p className='text text_type_main-default mb-10'>{error}</p>
			</section>
		);
	}

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
