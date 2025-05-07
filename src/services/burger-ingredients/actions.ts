import { fetchIngredientsRequest, parseApiError } from '../../utils/api';
import { TIngredient } from '../../utils/types';
import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_ERROR,
	GET_INGREDIENTS_RESET,
} from './constants';
import {
	TGetIngredientsRequest,
	TGetIngredientsSuccess,
	TGetIngredientsError,
	TResetIngredientsState,
} from './types';
import { AppThunk, AppDispatch } from '../../types';
export const getIngredientsRequest = (): TGetIngredientsRequest => ({
	type: GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccess = (
	ingredients: Array<TIngredient>
): TGetIngredientsSuccess => ({
	type: GET_INGREDIENTS_SUCCESS,
	payload: ingredients,
});

export const getIngredientsError = (error: string): TGetIngredientsError => ({
	type: GET_INGREDIENTS_ERROR,
	payload: error,
});

export const resetIngredientsState = (): TResetIngredientsState => ({
	type: GET_INGREDIENTS_RESET,
});

export const fetchIngredients: AppThunk =
	() =>
	async (dispatch: AppDispatch): Promise<void> => {
		dispatch(getIngredientsRequest());
		try {
			const ingredients: Array<TIngredient> = await fetchIngredientsRequest();
			dispatch(getIngredientsSuccess(ingredients));
		} catch (error) {
			dispatch(getIngredientsError(parseApiError(error)));
			setTimeout(() => {
				dispatch(resetIngredientsState());
			}, 5000);
		}
	};
