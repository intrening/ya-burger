import OrderFeed from '../components/feed/OrderFeed';
import styles from './home.module.css';

export default function Feed(): React.ReactElement {
	return (
		<main className={styles.home}>
			<OrderFeed />
		</main>
	);
}
