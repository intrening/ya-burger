import styles from './OrderFeed.module.css';

const readyOrders = [34533, 34532, 34530, 34527, 34525];
const inProgressOrders = [34538, 34541, 34542];

const OrderStat: React.FC<{ total: number; totalToday: number }> = ({
	total,
	totalToday,
}) => {
	return (
		<div className={styles.statsSection}>
			<div className={styles.statusesRow}>
				<div>
					<p className='text text_type_main-medium mb-2'>Готовы:</p>
					<ul className={styles.statusList + ' ' + styles.ready}>
						{readyOrders.map((num) => (
							<li key={num} className='text text_type_digits-default'>
								{num}
							</li>
						))}
					</ul>
				</div>
				<div>
					<p className='text text_type_main-medium mb-2'>В работе:</p>
					<ul className={styles.statusList}>
						{inProgressOrders.map((num) => (
							<li key={num} className='text text_type_digits-default'>
								{num}
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

export default OrderStat;
