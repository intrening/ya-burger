import { TIngredient } from '@utils/types';
import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_ERROR,
	GET_INGREDIENTS_RESET,
} from './constants';

export type TGetIngredientsRequest = {
	readonly type: typeof GET_INGREDIENTS_REQUEST;
};

export type TGetIngredientsSuccess = {
	readonly type: typeof GET_INGREDIENTS_SUCCESS;
	readonly payload: Array<TIngredient>;
};

export type TGetIngredientsError = {
	readonly type: typeof GET_INGREDIENTS_ERROR;
	readonly payload: string;
};

export type TResetIngredientsState = {
	readonly type: typeof GET_INGREDIENTS_RESET;
};

export type TIngredientsActions =
	| TGetIngredientsRequest
	| TGetIngredientsSuccess
	| TGetIngredientsError
	| TResetIngredientsState;

export type TBurgerIngredientsState = {
	ingredients: Array<TIngredient>;
	isLoading: boolean;
	error: string | null;
};
