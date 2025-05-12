import type { Middleware, MiddlewareAPI } from 'redux';
import { WS_CONNECTION_START } from '../feed/constants';
import {
	wsConnectionSuccess,
	wsConnectionError,
	wsGetMessage,
	wsConnectionClosed,
} from '../feed/actions';

import type { AppActions, AppDispatch, RootState } from '../../types';

export const socketMiddleware = (): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return (next) => (action: AppActions) => {
			const { dispatch } = store;
			const { type } = action;

			if (type === WS_CONNECTION_START && 'payload' in action) {
				const wsUrl = action.payload;
				socket = new WebSocket(wsUrl);
			}
			if (socket) {
				socket.onopen = (event) => {
					dispatch(wsConnectionSuccess(event));
				};
				socket.onerror = (event) => {
					dispatch(wsConnectionError(event));
				};
				socket.onmessage = (event) => {
					const { data } = event;
					dispatch(wsGetMessage(JSON.parse(data)));
				};
				socket.onclose = () => {
					dispatch(wsConnectionClosed());
				};
			}

			next(action);
		};
	}) as Middleware;
};
