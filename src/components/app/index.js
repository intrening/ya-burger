import styles from './app.module.css';
import ingredientsData from '../../utils/data';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
const App = () => {
	const bun = ingredientsData.find((item) => item.type === 'bun');
	const items = ingredientsData.filter((item) => item.type !== 'bun');
	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients ingredients={ingredientsData} />
				<BurgerConstructor bun={bun} items={items} />
			</main>
		</div>
	);
};

export default App;
