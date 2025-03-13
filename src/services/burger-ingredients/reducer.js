import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_ERROR,
} from './actions';

const initialState = {
	ingredients: [],
};

export const ingredientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_INGREDIENTS_REQUEST:
			return { ...state, isLoading: true };
		case GET_INGREDIENTS_SUCCESS:
			return { ...state, isLoading: false, ingredients: action.payload };
		case GET_INGREDIENTS_ERROR:
			return { ...state, isLoading: false, error: action.payload };
		default:
			return state;
	}
};

export default ingredientsReducer;
