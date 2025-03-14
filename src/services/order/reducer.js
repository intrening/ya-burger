import {
	ORDER_REQUEST,
	ORDER_SUCCESS,
	ORDER_ERROR,
	ORDER_RESET,
} from './actions';

const initialState = {
	orderNumber: null,
	loading: false,
	error: null,
};

export const orderReducer = (state = initialState, action) => {
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
