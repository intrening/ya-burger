import { TIngredient, TUser } from '@utils/types';

export type TOrderState = {
	orderNumber: number | null;
	loading: boolean;
	error: string | null;
};

export type TIngredientsState = {
	ingredients: Array<TIngredient>;
	isLoading: boolean;
	error: string | null;
};

export type TConstructorState = {
	ingredients: Array<TIngredient>;
	bun: TIngredient | null;
	isLoading: boolean;
	error: string | null;
};

export type TAuthState = {
	user: TUser | null;
	authError: string | null;
	isAuthChecked: boolean;
};

export type TStore = {
	burgerIngredients: TIngredientsState;
	burgerConstructor: TConstructorState;
	order: TOrderState;
	auth: TAuthState;
};
