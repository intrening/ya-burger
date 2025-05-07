import { createSelector } from 'reselect';
import { TIngredient } from '@utils/types';
import { TStore } from '@services/store';

export const getAllIngredients = (state: TStore) =>
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
