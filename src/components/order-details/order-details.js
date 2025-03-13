import styles from '../modal/modal.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../services/order/actions';
import { useEffect } from 'react';

const OrderDetails = () => {
	const dispatch = useDispatch();
	const { orderNumber, loading, error } = useSelector((state) => state.order);

	const { bun, ingredients } = useSelector((state) => state.burgerConstructor);

	useEffect(() => {
		dispatch(createOrder(bun, ingredients));
	}, [dispatch, bun, ingredients]);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
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
