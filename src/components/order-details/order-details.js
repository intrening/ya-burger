import styles from '../modal/modal.module.css';
import {
	CheckMarkIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, resetOrderState } from '../../services/order/actions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderDetails = () => {
	const dispatch = useDispatch();
	const { orderNumber, loading, error } = useSelector((state) => state.order);
	const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
	const user = useSelector((state) => state.auth.user);
	const navigate = useNavigate();
	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
		if (!orderNumber && !error && !loading) {
			dispatch(createOrder(bun, ingredients));
		}
	}, [dispatch, bun, ingredients, orderNumber, error, loading]);

	const handleRetry = () => {
		dispatch(resetOrderState());
	};

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
				<Button
					htmlType='button'
					type='primary'
					size='medium'
					onClick={handleRetry}>
					Попробовать снова
				</Button>
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
