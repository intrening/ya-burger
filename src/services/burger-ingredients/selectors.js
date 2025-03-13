import { createSelector } from 'reselect';

export const getAllIngredients = (state) => state.ingredients.ingredients;

export const getBunIngredients = createSelector(
	[getAllIngredients],
	(ingredients) => ingredients.filter((ingredient) => ingredient.type === 'bun')
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
