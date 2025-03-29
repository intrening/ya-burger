import { REGISTER_USER, LOGIN_USER, REGISTER_USER_ERROR } from './actions';

const initialState = {
	user: null,
	error: null,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_USER:
			return { ...state, user: action.payload, error: null };
		case REGISTER_USER_ERROR:
			return { ...state, error: true };
		case LOGIN_USER:
			return { ...state, user: action.payload, error: null };
		default:
			return state;
	}
};
