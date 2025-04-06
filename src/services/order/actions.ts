import { createOrderRequest } from '../../utils/api';
import { TOrder, TIngredient } from '../../utils/types';
import { Dispatch } from 'redux';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_ERROR = 'ORDER_ERROR';
export const ORDER_RESET = 'ORDER_RESET';

export const orderRequest = () => ({
	type: ORDER_REQUEST,
});

export const orderSuccess = (data: TOrder) => ({
	type: ORDER_SUCCESS,
	payload: data.number,
});

export const orderError = (error: string) => ({
	type: ORDER_ERROR,
	payload: error,
});

export const resetOrderState = () => ({
	type: ORDER_RESET,
});

export const createOrder = (
	bun: TIngredient,
	ingredients: Array<TIngredient>
) => {
	return async (dispatch: Dispatch) => {
		if (!bun || !bun._id) {
			dispatch(orderError('Необходимо добавить булку для оформления заказа'));
			return;
		}
		dispatch(orderRequest());
		try {
			const order: TOrder = await createOrderRequest(bun, ingredients);
			dispatch(orderSuccess(order));
			setTimeout(() => {
				dispatch(resetOrderState());
			}, 5000);
		} catch (error) {
			dispatch(
				orderError(
					error instanceof Error
						? error.message
						: 'Неизвестная ошибка оформления заказа'
				)
			);
		}
	};
};
