import { createSelector } from 'reselect';
import { TIngredient, RootState } from '../../types';

export const getAllIngredients = (state: RootState) =>
	state.burgerIngredients.ingredients;

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
