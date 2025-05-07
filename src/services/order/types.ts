import {
	ORDER_REQUEST,
	ORDER_SUCCESS,
	ORDER_ERROR,
	ORDER_RESET,
} from './constants';

export type TOrderRequest = {
	readonly type: typeof ORDER_REQUEST;
};

export type TOrderSuccess = {
	readonly type: typeof ORDER_SUCCESS;
	readonly payload: number;
};

export type TOrderError = {
	readonly type: typeof ORDER_ERROR;
	readonly payload: string;
};

export type TResetOrderError = {
	readonly type: typeof ORDER_ERROR;
	readonly payload: null;
};

export type TResetOrderState = {
	readonly type: typeof ORDER_RESET;
};

export type TOrderActions =
	| TOrderRequest
	| TOrderSuccess
	| TOrderError
	| TResetOrderError
	| TResetOrderState;

export type TOrderState = {
	orderNumber: number | null;
	loading: boolean;
	error: string | null;
};
