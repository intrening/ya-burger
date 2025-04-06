import styles from './order-history.module.css';

const OrderHistory: React.FC = () => {
	return (
		<div className={styles.container}>
			<p className='text text_type_main-default text_color_inactive'>
				История заказов будет позже
			</p>
		</div>
	);
};

export default OrderHistory;
