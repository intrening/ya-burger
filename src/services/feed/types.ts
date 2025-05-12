import { TOrder } from '../../types';
import {
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,
	WS_GET_MESSAGE,
} from './constants';

export type TFeedWsGetMessagePayload = {
	orders: Array<TOrder>;
	total: number;
	totalToday: number;
};

export type TFeedWsConnectionStart = {
	readonly type: typeof WS_CONNECTION_START;
	readonly payload: string;
};

export type TFeedWsConnectionSuccess = {
	readonly type: typeof WS_CONNECTION_SUCCESS;
	readonly payload: Event;
};

export type TFeedWsConnectionError = {
	readonly type: typeof WS_CONNECTION_ERROR;
};

export type TFeedWsGetMessage = {
	readonly type: typeof WS_GET_MESSAGE;
	readonly payload: TFeedWsGetMessagePayload;
};

export type TFeedWsConnectionClosed = {
	readonly type: typeof WS_CONNECTION_CLOSED;
};

export type TFeedActions =
	| TFeedWsConnectionStart
	| TFeedWsConnectionSuccess
	| TFeedWsConnectionError
	| TFeedWsConnectionClosed
	| TFeedWsGetMessage;

export type TFeedState = {
	wsConnected: boolean;
	orders: TOrder[];
	total: number;
	totalToday: number;
};
