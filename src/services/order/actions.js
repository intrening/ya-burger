export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_ERROR = 'ORDER_ERROR';

const API_URL = 'https://norma.nomoreparties.space/api/orders';

export const orderRequest = () => ({
	type: ORDER_REQUEST,
});

export const orderSuccess = (data) => ({
	type: ORDER_SUCCESS,
	payload: data,
});

export const orderError = (error) => ({
	type: ORDER_ERROR,
	payload: error,
});

export const createOrder = (bun, ingredients) => {
	return async (dispatch) => {
		dispatch(orderRequest());
		try {
			const response = await fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					ingredients: [bun, ...ingredients.map((item) => item._id), bun],
				}),
			});

			if (response.ok) {
				const data = await response.json();
				dispatch(orderSuccess(data.order.number));
			} else {
				const errorData = await response.json();
				dispatch(orderError(errorData.message || response.statusText));
			}
		} catch (error) {
			dispatch(orderError(error.message));
		}
	};
};
