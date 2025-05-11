import { OrderFeed, OrderStat } from '../components/feed';
import styles from '../components/feed/OrderFeed.module.css';

export default function Feed(): React.ReactElement {
	return (
		<main className={styles.home}>
			<section className={styles.feedWrapper}>
				<OrderFeed />
				<OrderStat />
			</section>
		</main>
	);
}
