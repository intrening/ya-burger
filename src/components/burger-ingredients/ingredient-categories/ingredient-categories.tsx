import styles from './ingredient-categories.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import { forwardRef } from 'react';
import { TIngredient } from '../../../utils/types';

const IngredientCategory = forwardRef<
	HTMLDivElement,
	{ id: string; title: string; ingredients: TIngredient[] }
>(({ id, title, ingredients }, ref) => {
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

IngredientCategory.displayName = 'IngredientCategory';

export default IngredientCategory;
