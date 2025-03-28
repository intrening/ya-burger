import {
	ADD_INGREDIENT,
	SET_BUN,
	SET_INGREDIENTS,
	REMOVE_INGREDIENT,
} from './actions';

const initialState = {
	ingredients: [],
	bun: null,
	isLoading: false,
	error: null,
};

export const burgerConstructorReducer = (state = initialState, action) => {
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
