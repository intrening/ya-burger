import styles from './burger-ingredients.module.css';
import Tabs from './tabs/tabs';
import IngredientCategory from './ingredient-categories/ingredient-categories';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/burger-ingredients/actions';
import {
	getBunIngredients,
	getSauceIngredients,
	getMainIngredients,
} from '../../services/burger-ingredients/selectors';

const BurgerIngredients = () => {
	const bunIngredients = useSelector(getBunIngredients);
	const sauceIngredients = useSelector(getSauceIngredients);
	const mainIngredients = useSelector(getMainIngredients);
	const isLoading = useSelector((state) => state.burgerIngredients.isLoading);
	const error = useSelector((state) => state.burgerIngredients.error);

	const dispach = useDispatch();

	useEffect(() => {
		dispach(fetchIngredients());
	}, [dispach]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<section className={styles.burgerIngredients}>
			<p className='text text_type_main-large'>Соберите бургер</p>
			<Tabs />
			<div className={`${styles.ingredients} custom-scroll pl-4 pr-4`}>
				<IngredientCategory
					id='bun'
					title='Булки'
					ingredients={bunIngredients}
				/>
				<IngredientCategory
					id='sauce'
					title='Соусы'
					ingredients={sauceIngredients}
				/>
				<IngredientCategory
					id='main'
					title='Начинки'
					ingredients={mainIngredients}
				/>
			</div>
		</section>
	);
};

export default BurgerIngredients;
