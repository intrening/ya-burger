import { SET_AUTH_CHECKED, SET_USER, SET_AUTH_ERROR } from './constants';
import { TUser } from '../../types';

export type TSetAuthChecked = {
	readonly type: typeof SET_AUTH_CHECKED;
	readonly payload: boolean;
};

export type TSetUser = {
	readonly type: typeof SET_USER;
	readonly payload: TUser | null;
};

export type TSetAuthError = {
	readonly type: typeof SET_AUTH_ERROR;
	readonly payload: string | null;
};

export type TAuthActions = TSetAuthChecked | TSetUser | TSetAuthError;

export type TAuthState = {
	user: TUser | null;
	authError: string | null;
	isAuthChecked: boolean;
};
