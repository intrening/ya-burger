import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useEffect, useState } from 'react';

const urlIngredients = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
	const [ingredients, setIngredients] = useState([]);
	const [constructorData, setConstructorData] = useState({
		bun: null,
		constructorIngredients: [],
	});

	useEffect(() => {
		const fetchIngredients = async () => {
			try {
				const res = await fetch(urlIngredients);
				if (!res.ok) {
					throw new Error(`Ошибка: ${res.status}`);
				}
				const data = await res.json();

				setIngredients(data.data);
				setConstructorData({
					bun: data.data.find((item) => item.type === 'bun'),
					constructorIngredients: data.data.filter(
						(item) => item.type !== 'bun'
					),
				});
			} catch (error) {
				console.error('Ошибка при получении данных:', error);
			}
		};
		fetchIngredients();
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients ingredients={ingredients} />
				<BurgerConstructor constructorData={constructorData} />
			</main>
		</div>
	);
};

export default App;
