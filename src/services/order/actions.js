import { ORDERS_URL } from '../../utils/constants';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_ERROR = 'ORDER_ERROR';
export const ORDER_RESET = 'ORDER_RESET';

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

export const resetOrderState = () => ({
	type: ORDER_RESET,
});

export const createOrder = (bun, ingredients) => {
	return async (dispatch) => {
		if (!bun || !bun._id) {
			dispatch(orderError('Необходимо добавить булку для оформления заказа'));
			return;
		}

		dispatch(orderRequest());
		try {
			const response = await fetch(ORDERS_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					ingredients: [
						bun._id,
						...ingredients.map((item) => item._id),
						bun._id,
					],
				}),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);
				throw new Error(
					errorData?.message ||
						`Ошибка оформления заказа: ${response.status} ${response.statusText}`
				);
			}

			const data = await response.json();

			if (!data.success) {
				throw new Error(data.message || 'API вернул неуспешный статус');
			}

			if (!data.order || !data.order.number) {
				throw new Error('Сервер вернул некорректный номер заказа');
			}

			dispatch(orderSuccess(data.order.number));
		} catch (error) {
			console.error('Ошибка при оформлении заказа:', error);
			dispatch(
				orderError(error.message || 'Неизвестная ошибка оформления заказа')
			);

			setTimeout(() => {
				dispatch(resetOrderState());
			}, 5000);
		}
	};
};
