import {
	registerUserRequest,
	loginUserRequest,
	forgotPasswordRequest,
	resetPasswordRequest,
	getUserRequest,
	updateUserRequest,
	logoutUserRequest,
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
			const data = await loginUserRequest(email, password);
			dispatch(setUser(data.user));
			dispatch(setAuthError(null));
			dispatch(setAuthChecked(true));
			return data;
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

export const checkUserAuth = () => async (dispatch) => {
	try {
		if (localStorage.getItem('accessToken')) {
			const data = await getUserRequest();
			dispatch(setUser(data.user));
			dispatch(setAuthChecked(true));
		} else {
			dispatch(setAuthChecked(true));
		}
	} catch (error) {
		dispatch(setAuthError(error.message));
	}
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

export const resetPassword = (form) => async (dispatch) => {
	try {
		await resetPasswordRequest(form);
		dispatch(setAuthError(null));
	} catch (error) {
		dispatch(setAuthError(error.message));
	}
};

export const updateUser = (form) => async (dispatch) => {
	try {
		const data = await updateUserRequest(form);
		dispatch(setUser(data.user));
		dispatch(setAuthError(null));
	} catch (error) {
		dispatch(setAuthError(error.message));
	}
};

export const logoutUser = () => async (dispatch) => {
	try {
		await logoutUserRequest();
		dispatch(setUser(null));
		dispatch(setAuthError(null));
	} catch (error) {
		dispatch(setAuthError(error.message));
	}
};
