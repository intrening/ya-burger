import React from 'react';
import { TIngredient } from '../../types';
import feedStyles from '../feed/feed.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type Props = {
	ingredients: Array<TIngredient>;
	ingredientCount: Record<string, number>;
};

const OrderIngredientsList: React.FC<Props> = ({
	ingredients,
	ingredientCount,
}) => (
	<ul
		className={feedStyles.ordersList}
		style={{ maxHeight: 320, marginBottom: 32 }}>
		{ingredients.map((ing) => (
			<li
				key={ing._id}
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
					{ingredientCount[ing._id]} x {ing.price}
				</span>
				<CurrencyIcon type='primary' />
			</li>
		))}
	</ul>
);

export default OrderIngredientsList;
