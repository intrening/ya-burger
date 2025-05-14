import styles from './order-history.module.css';
import { OrderFeed } from '../../components/feed';

const OrderHistory: React.FC = () => {
	return (
		<div className={styles.container}>
			<OrderFeed isAuth={true} />
		</div>
	);
};

export default OrderHistory;
