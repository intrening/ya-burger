import styles from './order-history.module.css';
import { OrderFeed } from '../../components/feed';
import { orders } from '../../config';

const OrderHistory: React.FC = () => {
	return (
		<div className={styles.container}>
			<OrderFeed orders={orders} />
		</div>
	);
};

export default OrderHistory;
