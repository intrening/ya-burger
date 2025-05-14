import styles from './feed.module.css';
import { useAppSelector } from '../../services/hooks';
import { TOrder } from '../../types';

const OrderFeedStat: React.FC = () => {
	const { orders, total, totalToday } = useAppSelector((state) => state.feed);

	if (!orders || !total || !totalToday) {
		return null;
	}

	const readyOrders = orders
		.filter((order: TOrder) => order.status === 'done')
		.slice(0, 20);
	const inProgressOrders = orders.filter(
		(order: TOrder) => order.status === 'pending'
	);

	const readyChunks = [
		readyOrders.slice(0, 10),
		readyOrders.slice(10, 20),
	].filter((chunk) => chunk.length);

	return (
		<div className={styles.statsSection}>
			<div className={styles.statusesRow}>
				{readyChunks.map((chunk, idx) => (
					<div key={`ready-col-${idx}`}>
						<p className='text text_type_main-medium mb-2'>Готовы:</p>
						<ul className={styles.statusList + ' ' + styles.ready}>
							{chunk.map((order: TOrder) => (
								<li key={order._id} className='text text_type_digits-default'>
									{order.number}
								</li>
							))}
						</ul>
					</div>
				))}
				<div>
					<p className='text text_type_main-medium mb-2'>В работе:</p>
					<ul className={styles.statusList}>
						{inProgressOrders.slice(0, 10).map((order: TOrder) => (
							<li key={order._id} className='text text_type_digits-default'>
								{order.number}
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className='mt-15'>
				<p className='text text_type_main-medium'>Выполнено за все время:</p>
				<span className='text text_type_digits-large'>
					{total.toLocaleString('ru-RU')}
				</span>
			</div>
			<div className='mt-15'>
				<p className='text text_type_main-medium'>Выполнено за сегодня:</p>
				<span className='text text_type_digits-large'>{totalToday}</span>
			</div>
		</div>
	);
};

export default OrderFeedStat;
