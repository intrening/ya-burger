export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';

export const setCurrentIngredient = (ingredient) => ({
	type: SET_CURRENT_INGREDIENT,
	payload: ingredient,
});
