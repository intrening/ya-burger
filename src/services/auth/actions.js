import { registerUserRequest, loginUserRequest } from '../../utils/api';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR';

export const registerUser = (email, password, name) => async (dispatch) => {
	try {
		const res = await registerUserRequest(email, password, name);
		dispatch({
			type: REGISTER_USER,
			payload: res.user,
		});
		return res;
	} catch (error) {
		dispatch({
			type: AUTH_ERROR,
			payload: error.message || 'Произошла ошибка при регистрации',
		});
	}
};

export const loginUser = (email, password) => async (dispatch) => {
	try {
		const res = await loginUserRequest(email, password);
		dispatch({
			type: LOGIN_USER,
			payload: res.user,
		});
		return res;
	} catch (error) {
		dispatch({
			type: AUTH_ERROR,
			payload: error.message || 'Произошла ошибка при входе',
		});
		throw error;
	}
};
