import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import Tabs from './tabs/tabs';
import IngredientCategory from './ingredient-categories/ingredient-categories';

const BurgerIngredients = ({ ingredients }) => {
	const buns = ingredients.filter((item) => item.type === 'bun');
	const sauces = ingredients.filter((item) => item.type === 'sauce');
	const mains = ingredients.filter((item) => item.type === 'main');

	return (
		<section className={styles.burgerIngredients}>
			<p className='text text_type_main-large'>Соберите бургер</p>
			<Tabs />
			<div className={`${styles.ingredients} custom-scroll pl-4 pr-4`}>
				<IngredientCategory id='bun' title='Булки' items={buns} />
				<IngredientCategory id='sauce' title='Соусы' items={sauces} />
				<IngredientCategory id='main' title='Начинки' items={mains} />
			</div>
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.array.isRequired,
};

export default BurgerIngredients;

// const IngredientCard = ({ item, onChangeIngredientCount }) => {
// 	const handleClick = () => {
// 		onChangeIngredientCount(item, 1);
// 	};

// 	return (
// 		<div className={styles.ingredient} onClick={handleClick}>
// 			{item.count > 0 && <Counter count={item.count} size='default' />}
// 			<img src={item.image} alt={item.name} />
// 			<div className={`${styles.price} mt-1 mb-1`}>
// 				<span className='text text_type_digits-default mr-2'>{item.price}</span>
// 				<CurrencyIcon type='primary' />
// 			</div>
// 			<p className='text text_type_main-default mb-2'>{item.name}</p>
// 		</div>
// 	);
// };

// IngredientCard.propTypes = {
// 	item: PropTypes.shape({
// 		_id: PropTypes.string.isRequired,
// 		name: PropTypes.string.isRequired,
// 		price: PropTypes.number.isRequired,
// 		image: PropTypes.string.isRequired,
// 		type: PropTypes.string.isRequired,
// 		count: PropTypes.number.isRequired,
// 		index: PropTypes.number.isRequired,
// 	}).isRequired,
// 	onChangeIngredientCount: PropTypes.func.isRequired,
// };
