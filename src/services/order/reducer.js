import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_ERROR } from './actions';

const initialState = {
	orderNumber: null,
	loading: false,
	error: null,
};

export const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case ORDER_REQUEST:
			return { ...state, loading: true };
		case ORDER_SUCCESS:
			return { ...state, orderNumber: action.payload, loading: false };
		case ORDER_ERROR:
			return { ...state, error: action.payload, loading: false };
		default:
			return state;
	}
};
