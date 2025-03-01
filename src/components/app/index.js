import styles from './app.module.css';
import AppHeader from '../app-header/app-header';

// import ingredientsData from '../../utils/data';

const App = () => {
	return (
		<div className={styles.app}>
			<AppHeader />
			{/* <main className={styles.main}>
			<BurgerIngredients 
				ingredients={ingredientsWithCounts}
				onChangeIngredientCount={this.changeIngredientCount}
			/>
			<BurgerConstructor 
				bun={bun}
				items={items}
				onRemoveIngredient={(positionInCart) => {
				const index = itemIndexes[positionInCart];
				if (index !== undefined) {
					this.changeIngredientCount({
					...this.state.ingredients[index],
					index
					}, -1);
				}
				}}
			/>
			</main> */}
		</div>
	);
};

export default App;
