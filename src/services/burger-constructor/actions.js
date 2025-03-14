import { v4 as uuidv4 } from 'uuid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const addIngredient = (ingredient) => ({
	type: ADD_INGREDIENT,
	payload: { ...ingredient, uuid: uuidv4() },
});

export const setIngredients = (ingredients) => ({
	type: SET_INGREDIENTS,
	payload: ingredients,
});

export const removeIngredient = (index) => ({
	type: REMOVE_INGREDIENT,
	payload: index,
});
