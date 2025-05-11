import { OrderFeed, OrderStat } from '../components/feed';
import styles from '../components/feed/OrderFeed.module.css';
import { orders } from '../config';

const Feed: React.FC = () => {
	return (
		<main className={styles.home}>
			<section className={styles.feedWrapper}>
				<OrderFeed orders={orders} />
				<OrderStat />
			</section>
		</main>
	);
};

export default Feed;
