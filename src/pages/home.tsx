import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import styles from './home.module.css';

const Home: React.FC = () => {
	return (
		<>
			<main className={styles.home}>
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients />
					<BurgerConstructor />
				</DndProvider>
			</main>
		</>
	);
};

export default Home;
