import styles from './order-history.module.css';
import { OrderFeed } from '../../components/feed';
import { useAppSelector } from '../../services/hooks';

const OrderHistory: React.FC = () => {
	const orders = useAppSelector((state) => state.feed.orders);
	return (
		<div className={styles.container}>
			<OrderFeed orders={orders} />
		</div>
	);
};

export default OrderHistory;
