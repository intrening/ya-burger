import { createOrderRequest } from '../../utils/api';
import { TIngredient } from '../../utils/types';
import { Dispatch } from 'redux';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_ERROR = 'ORDER_ERROR';
export const ORDER_RESET = 'ORDER_RESET';

export const orderRequest = () => ({
	type: ORDER_REQUEST,
});

export const orderSuccess = (orderNumber: number) => ({
	type: ORDER_SUCCESS,
	payload: orderNumber,
});

export const orderError = (error: string) => ({
	type: ORDER_ERROR,
	payload: error,
});

export const resetOrderError = () => ({
	type: ORDER_ERROR,
	payload: null,
});

export const resetOrderState = () => ({
	type: ORDER_RESET,
});

export const createOrder =
	(bun: TIngredient | null, ingredients: Array<TIngredient>) =>
	async (dispatch: Dispatch): Promise<void> => {
		if (!bun || !bun._id) {
			dispatch(orderError('Необходимо добавить булку для оформления заказа'));
			return;
		}
		dispatch(orderRequest());
		try {
			const orderNumber: number = await createOrderRequest(bun, ingredients);
			dispatch(orderSuccess(orderNumber));
		} catch (error) {
			// @ts-expect-error: Redux
			dispatch(orderError(error.message));
		}
	};
