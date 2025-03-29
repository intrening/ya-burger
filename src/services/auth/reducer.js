import { SET_AUTH_ERROR, SET_AUTH_CHECKED, SET_USER } from './actions';

const initialState = {
	user: null,
	authError: null,
	isAuthChecked: false,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				user: action.payload,
			};
		case SET_AUTH_ERROR:
			return {
				...state,
				authError: action.payload,
			};
		case SET_AUTH_CHECKED:
			return {
				...state,
				isAuthChecked: action.payload,
			};
		default:
			return state;
	}
};
