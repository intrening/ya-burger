import {
	registerUserRequest,
	loginUserRequest,
	forgotPasswordRequest,
	resetPasswordRequest,
	getUserRequest,
	updateUserRequest,
	logoutUserRequest,
} from '../../utils/api';
import { TUser, TUserForm } from '../../utils/types';
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
	({ email, password, name }: TUserForm) =>
	async (dispatch: Dispatch) => {
		try {
			await registerUserRequest({ email, password, name });
			dispatch(setAuthError(null));
		} catch (error) {
			dispatch(
				setAuthError(error instanceof Error ? error.message : 'Unknown error')
			);
		}
	};

export const loginUser =
	({ email, password }: Omit<TUserForm, 'name'>) =>
	async (dispatch: Dispatch) => {
		try {
			const user: TUser = await loginUserRequest({ email, password });
			dispatch(setUser(user));
			dispatch(setAuthError(null));
			dispatch(setAuthChecked(true));
			return user;
		} catch (error) {
			dispatch(
				setAuthError(error instanceof Error ? error.message : 'Unknown error')
			);
			return null;
		}
	};

export const checkUserAuth =
	() =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			if (localStorage.getItem('accessToken')) {
				const user: TUser = await getUserRequest();
				dispatch(setUser(user));
				dispatch(setAuthChecked(true));
			} else {
				dispatch(setAuthChecked(true));
			}
		} catch (error) {
			dispatch(
				setAuthError(error instanceof Error ? error.message : 'Unknown error')
			);
		}
	};

export const updateUser =
	({ email, password, name }: TUserForm) =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			const user: TUser = await updateUserRequest({ email, password, name });
			dispatch(setUser(user));
			dispatch(setAuthError(null));
		} catch (error) {
			dispatch(
				setAuthError(error instanceof Error ? error.message : 'Unknown error')
			);
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
			dispatch(
				setAuthError(error instanceof Error ? error.message : 'Unknown error')
			);
		}
	};

export const forgotPassword =
	(email: string) =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			await forgotPasswordRequest(email);
			dispatch(setAuthError(null));
		} catch (error) {
			dispatch(
				setAuthError(error instanceof Error ? error.message : 'Unknown error')
			);
		}
	};

export const resetPassword =
	({ email, password }: TUserForm) =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			await resetPasswordRequest({ email, password });
			dispatch(setAuthError(null));
		} catch (error) {
			dispatch(
				setAuthError(error instanceof Error ? error.message : 'Unknown error')
			);
		}
	};
