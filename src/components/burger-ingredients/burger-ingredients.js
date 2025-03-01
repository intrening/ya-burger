import styles from './burger-ingredients.module.css';
// import {
// 	CurrencyIcon,
// 	Counter,
// } from '@ya.praktikum/react-developer-burger-ui-components';
import Tabs from './tabs/tabs';

const BurgerIngredients = () => {
	// const buns = ingredients.filter((item) => item.type === 'bun');
	// const sauces = ingredients.filter((item) => item.type === 'sauce');
	// const mains = ingredients.filter((item) => item.type === 'main');

	return (
		<section className={styles.burgerIngredients}>
			<p className='text text_type_main-large'>Соберите бургер</p>
			<Tabs />
			{/* <div className={`${styles.ingredients} custom-scroll pl-4 pr-4`}>
				<IngredientCategory
					id='bun'
					title='Булки'
					items={buns}
					onChangeIngredientCount={onChangeIngredientCount}
				/>

				<IngredientCategory
					id='sauce'
					title='Соусы'
					items={sauces}
					onChangeIngredientCount={onChangeIngredientCount}
				/>

				<IngredientCategory
					id='main'
					title='Начинки'
					items={mains}
					onChangeIngredientCount={onChangeIngredientCount}
				/>
			</div> */}
		</section>
	);
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

// class IngredientCategory extends React.Component {
// 	render() {
// 		return (
// 			<div className={styles.category} id={this.props.id}>
// 				<p className='text text_type_main-medium'>{this.props.title}</p>
// 				<div className={styles.items}>
// 					{this.props.items.map((item) => (
// 						<IngredientCard
// 							key={item.index}
// 							item={item}
// 							onChangeIngredientCount={this.props.onChangeIngredientCount}
// 						/>
// 					))}
// 				</div>
// 			</div>
// 		);
// 	}
// }

// IngredientCategory.propTypes = {
// 	id: PropTypes.string.isRequired,
// 	title: PropTypes.string.isRequired,
// 	items: PropTypes.arrayOf(
// 		PropTypes.shape({
// 			_id: PropTypes.string.isRequired,
// 			name: PropTypes.string.isRequired,
// 			price: PropTypes.number.isRequired,
// 			image: PropTypes.string.isRequired,
// 			type: PropTypes.string.isRequired,
// 			count: PropTypes.number.isRequired,
// 			index: PropTypes.number.isRequired,
// 		})
// 	).isRequired,
// 	onChangeIngredientCount: PropTypes.func.isRequired,
// };
