import styles from '../modal/modal.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const OrderDetails = () => {
	const orderNumber = '123456';

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

OrderDetails.propTypes = {
	orderNumber: PropTypes.string.isRequired,
	orderIdentifier: PropTypes.string.isRequired,
	orderStatusMessage: PropTypes.string.isRequired,
};

export default OrderDetails;
