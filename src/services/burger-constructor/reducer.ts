import {
	ADD_INGREDIENT,
	SET_BUN,
	SET_INGREDIENTS,
	REMOVE_INGREDIENT,
} from './actions';
import { TConstructorState } from '../types';
import { TIngredient } from '@utils/types';

const initialState = {
	ingredients: [],
	bun: null,
	isLoading: false,
	error: null,
};

type TConstructorAction = {
	type: string;
	payload: TIngredient | number;
};

export const burgerConstructorReducer = (
	state: TConstructorState = initialState,
	action: TConstructorAction
) => {
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
		default:
			return state;
	}
};
