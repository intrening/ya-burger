import { REGISTER_USER, LOGIN_USER, AUTH_ERROR } from './actions';

const initialState = {
	user: null,
	error: null,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_USER:
			return { ...state, user: action.payload, error: null };
		case LOGIN_USER:
			return { ...state, user: action.payload, error: null };
		case AUTH_ERROR:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};
