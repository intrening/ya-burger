import styles from '../modal/modal.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/hooks';

const OrderDetails: React.FC = () => {
	const { orderNumber, loading, error } = useAppSelector(
		(state) => state.order
	);

	if (loading) {
		return (
			<div className={styles.content}>
				<p className={'text text_type_main-medium mt-8 mb-8'}>
					Оформляем ваш заказ...
				</p>
				<div className={styles.spinner}></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className={styles.content}>
				<p className={`text text_type_main-medium mb-6 ${styles.errorText}`}>
					Ошибка при оформлении заказа
				</p>
				<p className={'text text_type_main-default mb-10'}>{error}</p>
			</div>
		);
	}

	return (
		<div className={styles.content}>
			<p className={`${styles.orderNumber} text text_type_digits-large`}>
				{orderNumber}
			</p>
			<p className={`${styles.orderIdentifier} text text_type_main-medium`}>
				идентификатор заказа
			</p>
			<div className={styles.checkmarkIcon}>
				<CheckMarkIcon type='primary' />
			</div>
			<p className={`${styles.orderStatusMessage} text text_type_main-default`}>
				Ваш заказ начали готовить
			</p>
			<p
				className={`${styles.orderStatusDescription} text text_type_main-default`}>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};

export default OrderDetails;
