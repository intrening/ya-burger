import {
	registerUserRequest,
	loginUserRequest,
	forgotPasswordRequest,
	resetPasswordRequest,
	getUserRequest,
	updateUserRequest,
	logoutUserRequest,
	getTokens,
	parseApiError,
} from '../../utils/api';
import {
	TUser,
	TUserLoginForm,
	TUserResetPasswordForm,
	TUserRegisterUpdateForm,
	AppThunk,
	AppDispatch,
} from '../../types';
import { SET_AUTH_CHECKED, SET_USER, SET_AUTH_ERROR } from './constants';
import { TSetAuthChecked, TSetUser, TSetAuthError } from './types';

export const setAuthChecked = (value: boolean): TSetAuthChecked => ({
	type: SET_AUTH_CHECKED,
	payload: value,
});

export const setUser = (user: TUser | null): TSetUser => ({
	type: SET_USER,
	payload: user,
});

export const setAuthError = (errorMessage: string | null): TSetAuthError => ({
	type: SET_AUTH_ERROR,
	payload: errorMessage,
});

export const registerUser =
	({ email, password, name }: TUserRegisterUpdateForm) =>
	async (dispatch: AppDispatch): Promise<boolean> => {
		try {
			await registerUserRequest({ email, password, name });
			return true;
		} catch (error) {
			dispatch(setAuthError(parseApiError(error)));
			return false;
		}
	};

export const loginUser =
	({ email, password }: TUserLoginForm) =>
	async (dispatch: AppDispatch): Promise<TUser | null> => {
		try {
			const user: TUser = await loginUserRequest({ email, password });
			dispatch(setUser(user));
			dispatch(setAuthError(null));
			dispatch(setAuthChecked(true));
			return user;
		} catch (error) {
			dispatch(setAuthError(parseApiError(error)));
			return null;
		}
	};

export const checkUserAuth =
	() =>
	async (dispatch: AppDispatch): Promise<void> => {
		try {
			if (getTokens().accessToken) {
				const user: TUser = await getUserRequest();
				dispatch(setUser(user));
			}
		} catch (error) {
			dispatch(setAuthError(parseApiError(error)));
		} finally {
			dispatch(setAuthChecked(true));
		}
	};

export const updateUser =
	({ email, password, name }: TUserRegisterUpdateForm) =>
	async (dispatch: AppDispatch): Promise<void> => {
		try {
			const user: TUser = await updateUserRequest({ email, password, name });
			dispatch(setUser(user));
			dispatch(setAuthError(null));
		} catch (error) {
			dispatch(setAuthError(parseApiError(error)));
		}
	};

export const logoutUser =
	() =>
	async (dispatch: AppDispatch): Promise<void> => {
		try {
			await logoutUserRequest();
			dispatch(setUser(null));
			dispatch(setAuthError(null));
		} catch (error) {
			dispatch(setAuthError(parseApiError(error)));
		}
	};

export const forgotPassword =
	(email: string) =>
	async (dispatch: AppDispatch): Promise<void> => {
		try {
			await forgotPasswordRequest(email);
			dispatch(setAuthError(null));
		} catch (error) {
			dispatch(setAuthError(parseApiError(error)));
		}
	};

export const resetPassword =
	({ password, token }: TUserResetPasswordForm) =>
	async (dispatch: AppDispatch): Promise<boolean> => {
		try {
			await resetPasswordRequest({ password, token });
			dispatch(setAuthError(null));
			return true;
		} catch (error) {
			dispatch(setAuthError(parseApiError(error)));
			return false;
		}
	};
