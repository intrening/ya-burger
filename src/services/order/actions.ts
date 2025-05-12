import { createOrderRequest, parseApiError } from '../../utils/api';
import { TIngredient, AppDispatch } from '../../types';
import {
	ORDER_REQUEST,
	ORDER_SUCCESS,
	ORDER_ERROR,
	ORDER_RESET,
} from './constants';
import {
	TOrderRequest,
	TOrderSuccess,
	TOrderError,
	TResetOrderError,
	TResetOrderState,
} from './types';

export const orderRequest = (): TOrderRequest => ({
	type: ORDER_REQUEST,
});

export const orderSuccess = (orderNumber: number): TOrderSuccess => ({
	type: ORDER_SUCCESS,
	payload: orderNumber,
});

export const orderError = (error: string): TOrderError => ({
	type: ORDER_ERROR,
	payload: error,
});

export const resetOrderError = (): TResetOrderError => ({
	type: ORDER_ERROR,
	payload: null,
});

export const resetOrderState = (): TResetOrderState => ({
	type: ORDER_RESET,
});

export const createOrder =
	(bun: TIngredient | null, ingredients: Array<TIngredient>) =>
	async (dispatch: AppDispatch): Promise<void> => {
		if (!bun || !bun._id) {
			dispatch(orderError('Необходимо добавить булку для оформления заказа'));
			return;
		}
		dispatch(orderRequest());
		try {
			const orderNumber: number = await createOrderRequest(bun, ingredients);
			dispatch(orderSuccess(orderNumber));
		} catch (error) {
			dispatch(orderError(parseApiError(error)));
		}
	};
