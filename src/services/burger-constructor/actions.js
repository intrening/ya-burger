import { v4 as uuidv4 } from 'uuid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';

export const addIngredient = (ingredient) => ({
	type: ADD_INGREDIENT,
	payload: { ...ingredient, uuid: uuidv4() },
});

export const setIngredients = (ingredients) => ({
	type: SET_INGREDIENTS,
	payload: ingredients,
});
