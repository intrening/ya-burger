import { fetchIngredientsRequest } from '../../utils/api';
import { TIngredient } from '../../utils/types';
import { Dispatch } from 'redux';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';
export const GET_INGREDIENTS_RESET = 'GET_INGREDIENTS_RESET';

export const getIngredientsRequest = () => ({
	type: GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccess = (ingredients: Array<TIngredient>) => ({
	type: GET_INGREDIENTS_SUCCESS,
	payload: ingredients,
});

export const getIngredientsError = (error: string) => ({
	type: GET_INGREDIENTS_ERROR,
	payload: error,
});

export const resetIngredientsState = () => ({
	type: GET_INGREDIENTS_RESET,
});

export const fetchIngredients =
	() =>
	async (dispatch: Dispatch): Promise<void> => {
		dispatch(getIngredientsRequest());
		try {
			const ingredients: Array<TIngredient> = await fetchIngredientsRequest();
			dispatch(getIngredientsSuccess(ingredients));
		} catch (error) {
			// @ts-expect-error: Redux
			dispatch(getIngredientsError(error.message));
			setTimeout(() => {
				dispatch(resetIngredientsState());
			}, 5000);
		}
	};
