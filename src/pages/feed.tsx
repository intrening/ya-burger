import { OrderFeed, OrderFeedStat } from '../components/feed';
import styles from '../components/feed/feed.module.css';

const Feed: React.FC = () => {
	return (
		<main className={styles.home}>
			<section className={styles.feedWrapper}>
				<OrderFeed isAuth={false} />
				<OrderFeedStat />
			</section>
		</main>
	);
};

export default Feed;
