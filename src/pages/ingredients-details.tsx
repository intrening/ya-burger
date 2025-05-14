import styles from './ingredient-details.module.css';
import { useParams, useLocation } from 'react-router-dom';
import { useAppSelector } from '../services/hooks';
import { RootState } from '../types';

const IngredientsDetails: React.FC = () => {
	const { ingredientId } = useParams();
	const location = useLocation();
	const background = location.state?.background;

	const { ingredients, isLoading, error } = useAppSelector(
		(state: RootState) => state.burgerIngredients
	);

	const ingredient = ingredients.find((item) => item._id === ingredientId);

	if (isLoading) {
		return (
			<div className={styles.container}>
				<p className='text text_type_main-medium'>Загрузка...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className={styles.container}>
				<p className='text text_type_main-medium text_color_error'>{error}</p>
			</div>
		);
	}

	if (!ingredient) {
		return (
			<div className={styles.container}>
				<p className='text text_type_main-medium text_color_error'>
					Ингредиент не найден
				</p>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{!background && (
				<h2 className={'text text_type_main-large mb-5'}>Детали ингредиента</h2>
			)}
			<img
				className={styles.image}
				src={ingredient.image_large}
				alt={ingredient.name}
			/>
			<h3 className='text text_type_main-medium mb-8'>{ingredient.name}</h3>
			<div className={styles.nutritionalInfo}>
				<div className={styles.nutrient}>
					<span className='text text_type_main-default text_color_inactive mb-2'>
						Калории, ккал
					</span>
					<span className='text text_type_digits-default'>
						{ingredient.calories}
					</span>
				</div>
				<div className={styles.nutrient}>
					<span className='text text_type_main-default text_color_inactive mb-2'>
						Белки, г
					</span>
					<span className='text text_type_digits-default'>
						{ingredient.proteins}
					</span>
				</div>
				<div className={styles.nutrient}>
					<span className='text text_type_main-default text_color_inactive mb-2'>
						Жиры, г
					</span>
					<span className='text text_type_digits-default'>
						{ingredient.fat}
					</span>
				</div>
				<div className={styles.nutrient}>
					<span className='text text_type_main-default text_color_inactive mb-2'>
						Углеводы, г
					</span>
					<span className='text text_type_digits-default'>
						{ingredient.carbohydrates}
					</span>
				</div>
			</div>
		</div>
	);
};

export default IngredientsDetails;
