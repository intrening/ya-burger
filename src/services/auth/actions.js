import {
	registerUserRequest,
	loginUserRequest,
	forgotPasswordRequest,
} from '../../utils/api';

export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
export const SET_USER = 'SET_USER';

export const registerUser =
	({ email, password, name }) =>
	async (dispatch) => {
		try {
			await registerUserRequest(email, password, name);
			dispatch(setAuthError(null));
		} catch (error) {
			dispatch(setAuthError(error.message));
		}
	};

export const loginUser =
	({ email, password }) =>
	async (dispatch) => {
		try {
			const res = await loginUserRequest(email, password);
			console.log('res', res);
			dispatch(setUser(res.user));
			dispatch(setAuthError(null));
			dispatch(setAuthChecked(true));
			return res;
		} catch (error) {
			dispatch(setAuthError(error.message));
			return null;
		}
	};

export const setAuthChecked = (value) => ({
	type: SET_AUTH_CHECKED,
	payload: value,
});

export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

export const checkUserAuth = () => {
	return (dispatch) => {
		if (localStorage.getItem('accessToken')) {
			getUserRequest()
				.then((res) => dispatch(setUser(res.user)))
				.finally(() => dispatch(setAuthChecked(true)));
		} else {
			dispatch(setAuthChecked(true));
		}
	};
};

export const setAuthError = (errorMessage) => ({
	type: SET_AUTH_ERROR,
	payload: errorMessage,
});

export const forgotPassword = (email) => async (dispatch) => {
	try {
		await forgotPasswordRequest(email);
		dispatch(setAuthError(null));
	} catch (error) {
		dispatch(setAuthError(error.message));
	}
};
