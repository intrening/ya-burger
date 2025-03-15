import { INGREDIENTS_URL } from '../../utils/constants';

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
			const response = await fetch(INGREDIENTS_URL);

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);
				throw new Error(
					errorData?.message ||
						`Ошибка загрузки ингредиентов: ${response.status} ${response.statusText}`
				);
			}

			const data = await response.json();

			if (!data.success) {
				throw new Error(data.message || 'API вернул неуспешный статус');
			}

			if (!data.data || !Array.isArray(data.data)) {
				throw new Error('Некорректный формат данных с сервера');
			}

			dispatch(getIngredientsSuccess(data.data));
		} catch (error) {
			console.error('Ошибка при загрузке ингредиентов:', error);
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
