import { TIngredient } from '../../utils/types';
import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_ERROR,
	GET_INGREDIENTS_RESET,
} from './actions';

type TInitialState = {
	ingredients: Array<TIngredient>;
	isLoading: boolean;
	error: string | null;
};

type TAction = {
	type: string;
	payload: Array<TIngredient> | string | null;
};

const initialState: TInitialState = {
	ingredients: [],
	isLoading: false,
	error: null,
};

export const ingredientsReducer = (state = initialState, action: TAction) => {
	switch (action.type) {
		case GET_INGREDIENTS_REQUEST:
			return { ...state, isLoading: true, error: null };
		case GET_INGREDIENTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				ingredients: action.payload,
				error: null,
			};
		case GET_INGREDIENTS_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload,
				ingredients: [],
			};
		case GET_INGREDIENTS_RESET:
			return { ...state, error: null };
		default:
			return state;
	}
};
