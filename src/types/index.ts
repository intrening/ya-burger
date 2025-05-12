import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { TAuthActions } from '../services/auth/types';
import { TBurgerIngredientsActions } from '../services/burger-ingredients/types';
import { TBurgerConstructorActions } from '../services/burger-constructor/types';
import { TOrderActions } from '../services/order/types';
import { TFeedActions } from '../services/feed/types';
import store from '../services/store';

export type RootState = ReturnType<typeof store.getState>;

export type AppActions =
	| TAuthActions
	| TBurgerIngredientsActions
	| TBurgerConstructorActions
	| TOrderActions
	| TFeedActions;

export type AppThunk<TReturn = void> = ActionCreator<
	ThunkAction<TReturn, Action, RootState, AppActions>
>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

export type TIngredientId = string;

export type TIngredient = {
	_id: TIngredientId;
	name: string;
	price: number;
	image: string;
	image_mobile: string;
	type: string;
	uuid: string;
	image_large: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
};

export type TIngredientCategory = {
	id: string;
	title: string;
	ingredients: Array<TIngredient>;
	ref: React.RefObject<HTMLDivElement>;
};

export type TUser = {
	email: string;
	name: string;
};

export type TUserRegisterUpdateForm = TUser & {
	password: string;
};

export type TUserLoginForm = {
	email: string;
	password: string;
};

export type TUserResetPasswordForm = {
	password: string;
	token: string;
};

export type TOrder = {
	_id: string;
	status: string;
	name: string;
	number: number;
	createdAt: string;
	updatedAt?: string;
	ingredients: Array<TIngredientId>;
};
