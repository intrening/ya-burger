import { createSlice } from '@reduxjs/toolkit';
import { TFeedState } from './types';
import {
	wsConnectionStart,
	wsConnectionSuccess,
	wsConnectionError,
	wsConnectionClosed,
	wsGetMessage,
} from './actions';

const initialState: TFeedState = {
	wsConnected: false,
	orders: [],
	total: 0,
	totalToday: 0,
};

const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(wsConnectionStart, (state) => {
				state.wsConnected = true;
			})
			.addCase(wsConnectionSuccess, (state) => {
				state.wsConnected = true;
			})
			.addCase(wsConnectionError, (state) => {
				state.wsConnected = false;
			})
			.addCase(wsConnectionClosed, (state) => {
				state.wsConnected = false;
			})
			.addCase(wsGetMessage, (state, action) => {
				state.orders = action.payload.orders;
				state.total = action.payload.total;
				state.totalToday = action.payload.totalToday;
			});
	},
});

export default feedSlice.reducer;
