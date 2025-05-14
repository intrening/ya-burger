import {
	createOrderRequest,
	parseApiError,
	fetchOrderDetails,
} from '../../utils/api';
import { TOrder, TIngredient, AppDispatch } from '../../types';
import {
	ORDER_REQUEST,
	ORDER_SUCCESS,
	ORDER_ERROR,
	ORDER_RESET,
	GET_ORDER_REQUEST,
	GET_ORDER_SUCCESS,
	GET_ORDER_ERROR,
} from './constants';
import {
	TOrderRequest,
	TOrderSuccess,
	TOrderError,
	TResetOrderError,
	TResetOrderState,
	TGetOrderRequest,
	TGetOrderSuccess,
	TGetOrderError,
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

export const getOrderRequest = (): TGetOrderRequest => ({
	type: GET_ORDER_REQUEST,
});

export const getOrderSuccess = (order: TOrder): TGetOrderSuccess => ({
	type: GET_ORDER_SUCCESS,
	payload: order,
});

export const getOrderError = (error: string): TGetOrderError => ({
	type: GET_ORDER_ERROR,
	payload: error,
});

export const fetchOrderDetailsByNumber =
	(number: string) => async (dispatch: AppDispatch) => {
		dispatch(getOrderRequest());
		try {
			const order = await fetchOrderDetails(number);
			if (order) {
				dispatch(getOrderSuccess(order));
			} else {
				dispatch(getOrderError('Заказ не найден'));
			}
		} catch (error) {
			dispatch(getOrderError(parseApiError(error)));
		}
	};
