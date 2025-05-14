import {
	ADD_INGREDIENT,
	SET_BUN,
	SET_INGREDIENTS,
	REMOVE_INGREDIENT,
	RESET_CONSTRUCTOR,
} from './constants';
import { TBurgerConstructorActions, TBurgerConstructorState } from './types';

const initialState: TBurgerConstructorState = {
	ingredients: [],
	bun: null,
	isLoading: false,
	error: null,
};

export const burgerConstructorReducer = (
	state: TBurgerConstructorState = initialState,
	action: TBurgerConstructorActions
): TBurgerConstructorState => {
	switch (action.type) {
		case ADD_INGREDIENT:
			return { ...state, ingredients: [...state.ingredients, action.payload] };
		case REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: state.ingredients.filter(
					(_, index) => index !== action.payload
				),
			};
		case SET_INGREDIENTS:
			return { ...state, ingredients: action.payload };
		case SET_BUN:
			return { ...state, bun: action.payload };
		case RESET_CONSTRUCTOR:
			return { ...state, ingredients: [], bun: null };
		default:
			return state;
	}
};
