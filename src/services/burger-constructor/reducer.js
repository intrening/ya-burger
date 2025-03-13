import { ADD_INGREDIENT } from './actions';

const initialState = {
	ingredients: [],
	isLoading: false,
	error: null,
};

export const burgerConstructorReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_INGREDIENT:
			return { ...state, ingredients: [...state.ingredients, action.payload] };
		default:
			return state;
	}
};
