import styles from './ingredient-categories.module.css';
import PropTypes from 'prop-types';
import IngredientCard from '../ingredient-card/ingredient-card';
import { ingredientArrayPropType } from '../../../utils/prop-types';
import { forwardRef } from 'react';

const IngredientCategory = forwardRef(({ id, title, ingredients }, ref) => {
	return (
		<div className={styles.category} id={id} ref={ref}>
			<p className='text text_type_main-medium'>{title}</p>
			<div className={styles.items}>
				{ingredients.map((ingredient) => (
					<IngredientCard key={ingredient._id} ingredient={ingredient} />
				))}
			</div>
		</div>
	);
});

IngredientCategory.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	ingredients: ingredientArrayPropType.isRequired,
};

IngredientCategory.displayName = 'IngredientCategory';

export default IngredientCategory;
