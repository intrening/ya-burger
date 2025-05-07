import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from '@utils/types';
import {
	ADD_INGREDIENT,
	SET_BUN,
	SET_INGREDIENTS,
	REMOVE_INGREDIENT,
	RESET_CONSTRUCTOR,
} from './constants';
import {
	TAddIngredient,
	TRemoveIngredient,
	TSetIngredients,
	TResetConstructor,
} from './types';

export const addIngredient = (ingredient: TIngredient): TAddIngredient => {
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

export const removeIngredient = (index: number): TRemoveIngredient => ({
	type: REMOVE_INGREDIENT,
	payload: index,
});

export const setIngredients = (
	ingredients: Array<TIngredient>
): TSetIngredients => ({
	type: SET_INGREDIENTS,
	payload: ingredients,
});

export const resetConstructor = (): TResetConstructor => ({
	type: RESET_CONSTRUCTOR,
});
