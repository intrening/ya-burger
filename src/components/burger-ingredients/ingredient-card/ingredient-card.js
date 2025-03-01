import styles from './ingredient-card.module.css';
import PropTypes from 'prop-types';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientCard = ({ ingredient }) => {
	return (
		<div className={styles.ingredient}>
			<Counter count='1' size='default' />
			<img src={ingredient.image} alt={ingredient.name} />
			<div className={`${styles.price} mt-1 mb-1`}>
				<span className='text text_type_digits-default mr-2'>
					{ingredient.price}
				</span>
				<CurrencyIcon type='primary' />
			</div>
			<p className='text text_type_main-default mb-2'>{ingredient.name}</p>
		</div>
	);
};

IngredientCard.propTypes = {
	ingredient: PropTypes.shape({
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		image: PropTypes.string.isRequired,
	}).isRequired,
};

export default IngredientCard;
