import { createSelector } from 'reselect';
import { TIngredient, TIngredientId } from '../../utils/types';
import { RootState } from '../../types';

export const getAllIngredients = (state: RootState) =>
	state.burgerIngredients.ingredients;

export const getIngredientsById = (state: RootState) =>
	state.burgerIngredients.ingredientsById;

export const getBunIngredients = createSelector(
	[getAllIngredients],
	(ingredients: Array<TIngredient>) =>
		ingredients.filter((ingredient) => ingredient.type === 'bun')
);

export const getSauceIngredients = createSelector(
	[getAllIngredients],
	(ingredients) =>
		ingredients.filter((ingredient) => ingredient.type === 'sauce')
);

export const getMainIngredients = createSelector(
	[getAllIngredients],
	(ingredients) =>
		ingredients.filter((ingredient) => ingredient.type === 'main')
);

export const getIngredientById = createSelector(
	[getIngredientsById],
	(ingredientsById) => (id: TIngredientId) => ingredientsById[id]
);
