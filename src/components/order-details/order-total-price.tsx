import React from 'react';
import { TIngredient } from '../../types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.css';

type Props = {
	ingredients: Array<TIngredient>;
	createdAt: string;
};

const OrderTotalPrice: React.FC<Props> = ({ ingredients, createdAt }) => {
	const totalPrice = ingredients.reduce((sum, ing) => sum + ing.price, 0);

	return (
		<div className={styles.orderTotalPriceContainer}>
			<span className='text text_type_main-default text_color_inactive'>
				{new Date(createdAt).toLocaleString('ru-RU')}
			</span>
			<span
				className={`text text_type_digits-default ${styles.orderTotalPriceValue}`}>
				{totalPrice} <CurrencyIcon type='primary' />
			</span>
		</div>
	);
};

export default OrderTotalPrice;
