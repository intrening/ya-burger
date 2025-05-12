import type { Middleware, MiddlewareAPI } from 'redux';
import { WS_CONNECTION_START } from '../feed/constants';
import {
	wsConnectionSuccess,
	wsConnectionError,
	wsGetMessage,
	wsConnectionClosed,
} from '../feed/actions';
import { refreshTokens, getTokens } from '../../utils/api';
import type { AppActions, AppDispatch, RootState } from '../../types';

export const socketMiddleware = (): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;
		let wsUrl: string | null = null;

		return (next) => async (action: AppActions) => {
			const { dispatch } = store;
			const { type } = action;

			if (type === WS_CONNECTION_START && 'payload' in action) {
				wsUrl = action.payload;
				socket = new WebSocket(wsUrl);
			}
			if (socket) {
				socket.onopen = (event) => {
					dispatch(wsConnectionSuccess(event));
				};
				socket.onerror = () => {
					dispatch(wsConnectionError());
				};
				socket.onmessage = async (event) => {
					const { data } = event;
					const parsed = JSON.parse(data);

					if (parsed && parsed.message === 'Invalid or missing token') {
						try {
							await refreshTokens();
							if (wsUrl) {
								// Обновим accessToken в URL (если он есть в строке)
								const token = getTokens().accessToken;
								const newUrl = wsUrl.replace(
									/access_token=([^&]+)/,
									`access_token=${token.replace('Bearer ', '')}`
								);
								if (socket) socket.close();
								socket = new WebSocket(newUrl);
							}
						} catch (e) {
							if (socket) socket.close();
							dispatch(wsConnectionError());
						}
						return;
					}
					dispatch(wsGetMessage(parsed));
				};
				socket.onclose = () => {
					dispatch(wsConnectionClosed());
				};
			}

			next(action);
		};
	}) as Middleware;
};
