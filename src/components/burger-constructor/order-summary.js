import styles from './burger-constructor.module.css';
import {
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { calculateTotalPrice } from '../../services/order/selectors';

const OrderSummary = ({ onPlaceOrder }) => {
	const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
	const totalPrice = useSelector(calculateTotalPrice);

	const isOrderPossible = useMemo(() => {
		return bun && ingredients.length > 0;
	}, [bun, ingredients]);

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
				disabled={!isOrderPossible}
				htmlType='button'>
				Оформить заказ
			</Button>
		</div>
	);
};

OrderSummary.propTypes = {
	onPlaceOrder: PropTypes.func.isRequired,
};

export default OrderSummary;
