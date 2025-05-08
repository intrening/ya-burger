import { createSelector } from 'reselect';
import { RootState } from '../../types';
import { TIngredient } from '../../utils/types';

export const getBun = (state: RootState) => state.burgerConstructor.bun;
export const getIngredients = (state: RootState) =>
	state.burgerConstructor.ingredients;

export const calculateTotalPrice = createSelector(
	[getBun, getIngredients],
	(bun: TIngredient | null, ingredients: Array<TIngredient>) => {
		let total = 0;

		if (bun && typeof bun.price === 'number') {
			total += bun.price * 2;
		}
		if (ingredients && ingredients.length) {
			total += ingredients.reduce((sum, item) => sum + (item.price || 0), 0);
		}
		return total;
	}
);
