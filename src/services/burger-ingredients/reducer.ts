import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_ERROR,
	GET_INGREDIENTS_RESET,
} from './constants';
import { TBurgerIngredientsActions, TBurgerIngredientsState } from './types';
import { TIngredient, TIngredientId } from '../../utils/types';

const initialState: TBurgerIngredientsState = {
	ingredients: [],
	isLoading: false,
	error: null,
	ingredientsById: {},
};

export const burgerIngredientsReducer = (
	state: TBurgerIngredientsState = initialState,
	action: TBurgerIngredientsActions
): TBurgerIngredientsState => {
	switch (action.type) {
		case GET_INGREDIENTS_REQUEST:
			return { ...state, isLoading: true, error: null };
		case GET_INGREDIENTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				ingredients: action.payload,
				ingredientsById: action.payload.reduce(
					(acc: Record<TIngredientId, TIngredient>, ingredient) => {
						acc[ingredient._id] = ingredient;
						return acc;
					},
					{}
				),
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
