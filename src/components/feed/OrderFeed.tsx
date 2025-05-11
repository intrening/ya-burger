import OrderCard from './OrderCard';
import styles from './OrderFeed.module.css';
import { TOrder } from '../../utils/types';

const testOrders: Array<TOrder> = [
	{
		_id: '1',
		number: 34535,
		name: 'Death Star Starship Main бургер',
		status: 'done',
		createdAt: 'Сегодня, 16:20 i-GMT+3',
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa0942',
			'643d69a5c3f7b9001cfa0943',
		],
	},
	{
		_id: '2',
		number: 34534,
		name: 'Interstellar бургер',
		status: 'done',
		createdAt: 'Сегодня, 13:20 i-GMT+3',
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa0942',
			'643d69a5c3f7b9001cfa0944',
		],
	},
	{
		_id: '3',
		number: 34533,
		name: 'Black Hole Singularity острый бургер',
		status: 'done',
		createdAt: 'Вчера, 13:50 i-GMT+3',
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa0942',
			'643d69a5c3f7b9001cfa0944',
		],
	},
	{
		_id: '4',
		number: 34532,
		name: 'Supernova Infinity бургер',
		status: 'pending',
		createdAt: '2 дня назад, 21:53 i-GMT+3',
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa0942',
			'643d69a5c3f7b9001cfa0944',
		],
	},
];

const readyOrders = [34533, 34532, 34530, 34527, 34525];
const inProgressOrders = [34538, 34541, 34542];
const total = 28752;
const totalToday = 138;

const OrderFeed: React.FC = () => {
	return (
		<section className={styles.feedWrapper}>
			<div className={styles.ordersSection}>
				<h1 className='text text_type_main-large mb-5'>Лента заказов</h1>
				<div className={styles.ordersList + ' custom-scroll'}>
					{testOrders.map((order) => (
						<OrderCard key={order._id} order={order} />
					))}
				</div>
			</div>
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
		</section>
	);
};

export default OrderFeed;
