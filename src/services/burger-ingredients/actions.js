import { fetchIngredientsRequest } from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';
export const GET_INGREDIENTS_RESET = 'GET_INGREDIENTS_RESET';

export const getIngredientsRequest = () => ({
	type: GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccess = (ingredients) => ({
	type: GET_INGREDIENTS_SUCCESS,
	payload: ingredients,
});

export const getIngredientsError = (error) => ({
	type: GET_INGREDIENTS_ERROR,
	payload: error,
});

export const resetIngredientsState = () => ({
	type: GET_INGREDIENTS_RESET,
});

export const fetchIngredients = () => {
	return async (dispatch) => {
		dispatch(getIngredientsRequest());
		try {
			const ingredients = await fetchIngredientsRequest();
			dispatch(getIngredientsSuccess(ingredients));
		} catch (error) {
			dispatch(
				getIngredientsError(
					error.message || 'Неизвестная ошибка загрузки ингредиентов'
				)
			);
			setTimeout(() => {
				dispatch(resetIngredientsState());
			}, 5000);
		}
	};
};
