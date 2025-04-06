import {
	registerUserRequest,
	loginUserRequest,
	forgotPasswordRequest,
	resetPasswordRequest,
	getUserRequest,
	updateUserRequest,
	logoutUserRequest,
	getTokens,
} from '../../utils/api';
import {
	TUser,
	TUserLoginForm,
	TUserResetPasswordForm,
	TUserRegisterUpdateForm,
} from '../../utils/types';
import { Dispatch } from 'redux';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
export const SET_USER = 'SET_USER';

export const setAuthChecked = (value: boolean) => ({
	type: SET_AUTH_CHECKED,
	payload: value,
});

export const setUser = (user: TUser | null) => ({
	type: SET_USER,
	payload: user,
});

export const setAuthError = (errorMessage: string | null) => ({
	type: SET_AUTH_ERROR,
	payload: errorMessage,
});

export const registerUser =
	({ email, password, name }: TUserRegisterUpdateForm) =>
	async (dispatch: Dispatch): Promise<boolean> => {
		try {
			await registerUserRequest({ email, password, name });
			dispatch(setAuthError(null));
			return true;
		} catch (error) {
			// @ts-expect-error: Redux
			dispatch(setAuthError(error.message));
			return false;
		}
	};

export const loginUser =
	({ email, password }: TUserLoginForm) =>
	async (dispatch: Dispatch): Promise<TUser | null> => {
		try {
			const user: TUser = await loginUserRequest({ email, password });
			dispatch(setUser(user));
			dispatch(setAuthError(null));
			dispatch(setAuthChecked(true));
			return user;
		} catch (error) {
			dispatch(
				// @ts-expect-error: Redux
				setAuthError(error.message)
			);
			return null;
		}
	};

export const checkUserAuth =
	() =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			if (getTokens().accessToken) {
				const user: TUser = await getUserRequest();
				dispatch(setUser(user));
			}
		} catch (error) {
			dispatch(
				// @ts-expect-error: Redux
				setAuthError(error.message)
			);
		} finally {
			dispatch(setAuthChecked(true));
		}
	};

export const updateUser =
	({ email, password, name }: TUserRegisterUpdateForm) =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			const user: TUser = await updateUserRequest({ email, password, name });
			dispatch(setUser(user));
			dispatch(setAuthError(null));
		} catch (error) {
			// @ts-expect-error: Redux
			dispatch(setAuthError(error.message));
		}
	};

export const logoutUser =
	() =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			await logoutUserRequest();
			dispatch(setUser(null));
			dispatch(setAuthError(null));
		} catch (error) {
			// @ts-expect-error: Redux
			dispatch(setAuthError(error.message));
		}
	};

export const forgotPassword =
	(email: string) =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			await forgotPasswordRequest(email);
			dispatch(setAuthError(null));
		} catch (error) {
			// @ts-expect-error: Redux
			dispatch(setAuthError(error.message));
		}
	};

export const resetPassword =
	({ password, token }: TUserResetPasswordForm) =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			await resetPasswordRequest({ password, token });
			dispatch(setAuthError(null));
		} catch (error) {
			// @ts-expect-error: Redux
			dispatch(setAuthError(error.message));
		}
	};
