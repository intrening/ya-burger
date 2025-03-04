import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useEffect, useState } from 'react';

const urlIngredients = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
	const [ingredients, setIngredients] = useState([]);
	useEffect(() => {
		try {
			const fetchIngredients = async () => {
				const res = await fetch(urlIngredients);
				const data = await res.json();
				setIngredients(data.data);
			};
			fetchIngredients();
		} catch (error) {
			console.error('Ошибка при получении данных:', error);
		}
	}, []);

	const filterBun = (ingredients) => {
		return ingredients.find((item) => item.type === 'bun');
	};

	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients ingredients={ingredients} />
				<BurgerConstructor
					ingredients={ingredients}
					bun={filterBun(ingredients)}
				/>
			</main>
		</div>
	);
};

export default App;
