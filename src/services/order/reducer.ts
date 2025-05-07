import {
	ORDER_REQUEST,
	ORDER_SUCCESS,
	ORDER_ERROR,
	ORDER_RESET,
} from './constants';
import { TOrderState, TOrderActions } from './types';

const initialState: TOrderState = {
	orderNumber: null,
	loading: false,
	error: null,
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
		default:
			return state;
	}
};
