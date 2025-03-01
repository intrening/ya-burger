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
				<IngredientCategory id='bun' title='Булки' ingredients={buns} />
				<IngredientCategory id='sauce' title='Соусы' ingredients={sauces} />
				<IngredientCategory id='main' title='Начинки' ingredients={mains} />
			</div>
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.array.isRequired,
};

export default BurgerIngredients;
