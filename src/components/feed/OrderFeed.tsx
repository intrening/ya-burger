import OrderCard from './OrderCard';
import styles from './OrderFeed.module.css';
import { TOrder } from '../../utils/types';

const OrderFeed: React.FC<{ orders: Array<TOrder> }> = ({ orders }) => {
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
