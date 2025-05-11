import { createSelector } from 'reselect';
import { TIngredient, TIngredientId } from '../../utils/types';
import { RootState } from '../../types';

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

export const getIngredientsByIds = createSelector(
	[
		(state: RootState) => state.burgerIngredients.ingredients,
		(_: RootState, ids: TIngredientId[]) => ids,
	],
	(ingredients, ids) => {
		const byId = Object.fromEntries(ingredients.map((i) => [i._id, i]));
		return ids.map((id) => byId[id]).filter(Boolean);
	}
);
