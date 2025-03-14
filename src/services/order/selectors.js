import { createSelector } from 'reselect';

export const getBun = (state) => state.burgerConstructor.bun;
export const getIngredients = (state) => state.burgerConstructor.ingredients;

export const calculateTotalPrice = createSelector(
	[getBun, getIngredients],
	(bun, ingredients) => {
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
