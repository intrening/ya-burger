import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../services/hooks';
import { OrderFeed, OrderFeedStat } from '../components/feed';
import styles from '../components/feed/OrderFeed.module.css';
import {
	wsConnectionClosed,
	wsConnectionStart,
} from '../services/feed/actions';

const Feed: React.FC = () => {
	const dispatch = useAppDispatch();
	const { orders, total, totalToday } = useAppSelector((state) => state.feed);

	useEffect(() => {
		dispatch(wsConnectionStart());
		return () => {
			dispatch(wsConnectionClosed());
		};
	}, [dispatch]);

	const isLoading = !orders || !total || !totalToday;

	if (isLoading) {
		return (
			<div className={styles.loaderContainer}>
				<p className='text text_type_main-large'>Загрузка...</p>
				<div className={styles.loader}></div>
			</div>
		);
	}

	return (
		<main className={styles.home}>
			<section className={styles.feedWrapper}>
				<OrderFeed orders={orders} />
				<OrderFeedStat />
			</section>
		</main>
	);
};

export default Feed;
