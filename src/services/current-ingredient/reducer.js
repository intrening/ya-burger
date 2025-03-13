import { SET_CURRENT_INGREDIENT, CLEAR_CURRENT_INGREDIENT } from './actions';

const initialState = null;

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_INGREDIENT:
			return action.payload;
		case CLEAR_CURRENT_INGREDIENT:
			return null;
		default:
			return state;
	}
};
