import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useEffect, useState } from 'react';

const App = () => {
	const [constructorData, setConstructorData] = useState({
		bun: null,
		constructorIngredients: [],
	});

	useEffect(() => {
		const fetchIngredients = async () => {
			try {
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
				<BurgerIngredients />
				<BurgerConstructor constructorData={constructorData} />
			</main>
		</div>
	);
};

export default App;
