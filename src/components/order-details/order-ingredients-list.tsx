import React from 'react';
import { TIngredient } from '../../types';
import feedStyles from '../feed/feed.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type Props = {
	ingredients: Array<TIngredient>;
};

const OrderIngredientsList: React.FC<Props> = ({ ingredients }) => (
	<ul
		className={feedStyles.ordersList}
		style={{ maxHeight: 320, marginBottom: 32 }}>
		{ingredients.map((ing, idx) => (
			<li
				key={idx}
				style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
				<img
					src={ing.image}
					alt={ing.name}
					style={{
						width: 64,
						height: 64,
						borderRadius: '50%',
						marginRight: 16,
						background: '#222',
					}}
				/>
				<span className='text text_type_main-default' style={{ flex: 1 }}>
					{ing.name}
				</span>
				<span
					className='text text_type_digits-default'
					style={{ marginLeft: 16 }}>
					{ing.price}
				</span>
				<CurrencyIcon type='primary' />
			</li>
		))}
	</ul>
);

export default OrderIngredientsList;
