// @ts-expect-error: uuid
import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from '@utils/types';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const SET_BUN = 'SET_BUN';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const addIngredient = (ingredient: TIngredient) => {
	if (ingredient.type === 'bun') {
		return {
			type: SET_BUN,
			payload: ingredient,
		};
	} else {
		return {
			type: ADD_INGREDIENT,
			payload: { ...ingredient, uuid: uuidv4() },
		};
	}
};

export const removeIngredient = (index: number) => ({
	type: REMOVE_INGREDIENT,
	payload: index,
});

export const setIngredients = (ingredients: Array<TIngredient>) => ({
	type: SET_INGREDIENTS,
	payload: ingredients,
});
