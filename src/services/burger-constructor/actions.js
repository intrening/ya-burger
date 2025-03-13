export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export const addIngredient = (ingredient) => ({
	type: ADD_INGREDIENT,
	payload: ingredient,
});

export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const removeIngredient = (ingredient) => ({
	type: REMOVE_INGREDIENT,
	payload: ingredient,
});

export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export const moveIngredient = (ingredient) => ({
	type: MOVE_INGREDIENT,
	payload: ingredient,
});

export const SET_BUN = 'SET_BUN';

export const setBun = (bun) => ({
	type: SET_BUN,
	payload: bun,
});
