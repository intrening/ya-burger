import {
	ORDER_REQUEST,
	ORDER_SUCCESS,
	ORDER_ERROR,
	ORDER_RESET,
	GET_ORDER_REQUEST,
	GET_ORDER_SUCCESS,
	GET_ORDER_ERROR,
} from './constants';
import { TOrderState, TOrderActions } from './types';

const initialState: TOrderState = {
	orderNumber: null,
	loading: false,
	error: null,
	orderDetails: null,
};

export const orderReducer = (
	state: TOrderState = initialState,
	action: TOrderActions
): TOrderState => {
	switch (action.type) {
		case ORDER_REQUEST:
			return { ...state, loading: true, error: null };
		case ORDER_SUCCESS:
			return {
				...state,
				orderNumber: action.payload,
				loading: false,
				error: null,
			};
		case ORDER_ERROR:
			return { ...initialState, error: action.payload };
		case ORDER_RESET:
			return initialState;
		case GET_ORDER_REQUEST:
			return { ...state, loading: true, error: null, orderDetails: null };
		case GET_ORDER_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				orderDetails: action.payload,
			};
		case GET_ORDER_ERROR:
			return {
				...state,
				loading: false,
				orderDetails: null,
				error: action.payload,
			};
		default:
			return state;
	}
};
