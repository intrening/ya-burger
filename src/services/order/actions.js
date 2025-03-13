export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_ERROR = 'ORDER_ERROR';

export const orderRequest = () => ({
	type: ORDER_REQUEST,
});

export const orderSuccess = (data) => ({
	type: ORDER_SUCCESS,
	payload: data,
});
