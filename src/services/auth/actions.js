import { apiRegisterUser, apiLoginUser } from '../../utils/api';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const registerUser = (email, password, name) => async (dispatch) => {
	const res = await apiRegisterUser(email, password, name);
	dispatch({
		type: REGISTER_USER,
		payload: res.user,
	});
};

export const loginUser = (email, password) => async (dispatch) => {
	const res = await apiLoginUser(email, password);
	dispatch({
		type: LOGIN_USER,
		payload: res.user,
	});
};
