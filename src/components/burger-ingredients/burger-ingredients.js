import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import Tabs from './tabs/tabs';
import IngredientCategory from './ingredient-categories/ingredient-categories';
import { useMemo } from 'react';

const BurgerIngredients = ({ ingredients }) => {
	const filteredIngredients = useMemo(() => {
		return {
			bun: ingredients.filter((item) => item.type === 'bun'),
			sauce: ingredients.filter((item) => item.type === 'sauce'),
			main: ingredients.filter((item) => item.type === 'main'),
		};
	}, [ingredients]);

	return (
		<section className={styles.burgerIngredients}>
			<p className='text text_type_main-large'>Соберите бургер</p>
			<Tabs />
			<div className={`${styles.ingredients} custom-scroll pl-4 pr-4`}>
				<IngredientCategory
					id='bun'
					title='Булки'
					ingredients={filteredIngredients.bun}
				/>
				<IngredientCategory
					id='sauce'
					title='Соусы'
					ingredients={filteredIngredients.sauce}
				/>
				<IngredientCategory
					id='main'
					title='Начинки'
					ingredients={filteredIngredients.main}
				/>
			</div>
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.array.isRequired,
};

export default BurgerIngredients;
