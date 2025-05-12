import {
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_GET_MESSAGE,
	WS_CONNECTION_CLOSED,
} from './constants';
import {
	TFeedWsConnectionStart,
	TFeedWsConnectionSuccess,
	TFeedWsConnectionError,
	TFeedWsGetMessage,
	TFeedWsGetMessagePayload,
	TFeedWsConnectionClosed,
} from './types';

export const wsConnectionStart = (): TFeedWsConnectionStart => ({
	type: WS_CONNECTION_START,
});

export const wsConnectionSuccess = (
	event: Event
): TFeedWsConnectionSuccess => ({
	type: WS_CONNECTION_SUCCESS,
	payload: event,
});

export const wsConnectionError = (event: Event): TFeedWsConnectionError => ({
	type: WS_CONNECTION_ERROR,
	payload: event,
});

export const wsGetMessage = (
	data: TFeedWsGetMessagePayload
): TFeedWsGetMessage => ({
	type: WS_GET_MESSAGE,
	payload: data,
});

export const wsConnectionClosed = (): TFeedWsConnectionClosed => ({
	type: WS_CONNECTION_CLOSED,
});
