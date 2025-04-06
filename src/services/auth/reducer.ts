import { SET_AUTH_ERROR, SET_AUTH_CHECKED, SET_USER } from './actions';
import { TUser } from '../../utils/types';
import { TAuthState } from '../types';

type TAuthAction = {
	type: string;
	payload: TUser | null | string | boolean;
};

const initialState: TAuthState = {
	user: null,
	authError: null,
	isAuthChecked: false,
};

export const authReducer = (
	state: TAuthState = initialState,
	action: TAuthAction
) => {
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
