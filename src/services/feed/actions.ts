import { getTrimmedAccessToken } from '@utils/api';
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

const WS_URL = 'wss://norma.nomoreparties.space/orders';

export const wsConnectionStart = (): TFeedWsConnectionStart => ({
	type: WS_CONNECTION_START,
	payload: `${WS_URL}/all`,
});

export const wsConnectionWithAuthStart = (): TFeedWsConnectionStart => {
	const accessToken = getTrimmedAccessToken();

	return {
		type: WS_CONNECTION_START,
		payload: `${WS_URL}?token=${accessToken}`,
	};
};

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
