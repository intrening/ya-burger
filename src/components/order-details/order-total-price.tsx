import React from 'react';
import { TIngredient } from '../../types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.css';

type Props = {
	ingredients: Array<TIngredient>;
	ingredientCount: Record<string, number>;
	createdAt: string;
};

const OrderTotalPrice: React.FC<Props> = ({
	ingredients,
	ingredientCount,
	createdAt,
}) => {
	const totalPrice = ingredients.reduce(
		(sum, ing) => sum + ing.price * ingredientCount[ing._id],
		0
	);

	return (
		<div className={styles.orderTotalPriceContainer}>
			<span className='text text_type_main-default text_color_inactive'>
				{createdAt}
			</span>
			<span
				className={`text text_type_digits-default ${styles.orderTotalPriceValue}`}>
				{totalPrice} <CurrencyIcon type='primary' />
			</span>
		</div>
	);
};

export default OrderTotalPrice;
