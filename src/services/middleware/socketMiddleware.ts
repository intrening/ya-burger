import type { Middleware, MiddlewareAPI } from 'redux';
import {
	WS_CONNECTION_ERROR,
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS,
	WS_GET_MESSAGE,
	WS_CONNECTION_CLOSED,
	WS_SEND_MESSAGE,
} from '../feed/constants';

import type { AppActions, AppDispatch, RootState } from '../../types';

export const socketMiddleware = (wsUrl: string): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return (next) => (action: AppActions) => {
			const { dispatch } = store;
			const { type } = action;
			let payload;
			if ('payload' in action) {
				payload = action.payload;
			}
			if (type === WS_CONNECTION_START) {
				socket = new WebSocket(wsUrl);
			}
			if (socket) {
				socket.onopen = (event) => {
					dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
				};
				socket.onerror = (event) => {
					dispatch({ type: WS_CONNECTION_ERROR, payload: event });
				};
				socket.onmessage = (event) => {
					const { data } = event;
					dispatch({ type: WS_GET_MESSAGE, payload: data });
				};
				socket.onclose = (event) => {
					dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
				};

				if (type === WS_SEND_MESSAGE && payload) {
					socket.send(JSON.stringify(payload));
				}
			}

			next(action);
		};
	}) as Middleware;
};
