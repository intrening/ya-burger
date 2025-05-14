import { TOrder } from '../../types';
import {
	wsConnectionError,
	wsConnectionStart,
	wsConnectionSuccess,
	wsGetMessage,
	wsConnectionClosed,
} from './actions';

export type TFeedWsGetMessagePayload = {
	orders: Array<TOrder>;
	total: number;
	totalToday: number;
};

export type TFeedState = {
	wsConnected: boolean;
	orders: TOrder[];
	total: number;
	totalToday: number;
};

export type TFeedActions =
	| ReturnType<typeof wsConnectionStart>
	| ReturnType<typeof wsConnectionSuccess>
	| ReturnType<typeof wsConnectionError>
	| ReturnType<typeof wsConnectionClosed>
	| ReturnType<typeof wsGetMessage>;
