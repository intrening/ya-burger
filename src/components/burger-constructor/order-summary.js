import styles from './burger-constructor.module.css';
import {
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const OrderSummary = ({ totalPrice, onPlaceOrder }) => {
	return (
		<div className={`${styles.totalSection} mr-4 mt-10`}>
			<div className={styles.totalPrice}>
				<span className='text text_type_digits-medium'>{totalPrice}</span>
				<CurrencyIcon type='primary' />
			</div>
			<Button
				type='primary'
				size='large'
				onClick={onPlaceOrder}
				htmlType='button'>
				Оформить заказ
			</Button>
		</div>
	);
};

OrderSummary.propTypes = {
	totalPrice: PropTypes.number.isRequired,
	onPlaceOrder: PropTypes.func.isRequired,
};

export default OrderSummary;
