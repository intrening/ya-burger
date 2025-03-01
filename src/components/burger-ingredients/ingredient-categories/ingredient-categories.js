import styles from './ingredient-categories.module.css';
import PropTypes from 'prop-types';
// import IngredientCard from '../ingredient-card/ingredient-card';

const IngredientCategory = ({ id, title, items }) => {
	return (
		<div className={styles.category} id={id}>
			<p className='text text_type_main-medium'>{title}</p>
			<div className={styles.items}>
				{items.map((item) => (
					<p key={item.index}>{item.name}</p>
					// <IngredientCard
					// 	key={item.index}
					// 	item={item}
					// 	onChangeIngredientCount={onChangeIngredientCount}
					// />
				))}
			</div>
		</div>
	);
};

IngredientCategory.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	items: PropTypes.array.isRequired,
};

export default IngredientCategory;
