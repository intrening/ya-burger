export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

const urlIngredients = 'https://norma.nomoreparties.space/api/ingredients';

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

export const fetchIngredients = () => {
	return async (dispatch) => {
		dispatch(getIngredientsRequest());
		try {
			const response = await fetch(urlIngredients);
			const data = await response.json();
			dispatch(getIngredientsSuccess(data.data));
		} catch (error) {
			dispatch(getIngredientsError(error));
		}
	};
};
