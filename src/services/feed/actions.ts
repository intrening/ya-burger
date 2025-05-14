import { createAction } from '@reduxjs/toolkit';
import { getTrimmedAccessToken } from '@utils/api';
import { TFeedWsGetMessagePayload } from './types';

const WS_CONNECTION_START = 'feed/wsConnectionStart';
const WS_CONNECTION_SUCCESS = 'feed/wsConnectionSuccess';
const WS_CONNECTION_ERROR = 'feed/wsConnectionError';
const WS_GET_MESSAGE = 'feed/wsGetMessage';
const WS_CONNECTION_CLOSED = 'feed/wsConnectionClosed';

const WS_URL = 'wss://norma.nomoreparties.space/orders';

export const wsConnectionStart = createAction(
	WS_CONNECTION_START,
	(url?: string) => ({ payload: url ?? `${WS_URL}/all` })
);

export const wsConnectionWithAuthStart = () => {
	const accessToken = getTrimmedAccessToken();
	return wsConnectionStart(`${WS_URL}?token=${accessToken}`);
};

export const wsConnectionSuccess = createAction(WS_CONNECTION_SUCCESS);
export const wsConnectionError = createAction<string>(WS_CONNECTION_ERROR);
export const wsGetMessage =
	createAction<TFeedWsGetMessagePayload>(WS_GET_MESSAGE);
export const wsConnectionClosed = createAction(WS_CONNECTION_CLOSED);
