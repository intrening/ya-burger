import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	SET_INGREDIENTS,
	RESET_CONSTRUCTOR,
	SET_BUN,
} from './constants';
import { TIngredient } from '../../types';

export type TAddIngredient = {
	readonly type: typeof ADD_INGREDIENT | typeof SET_BUN;
	readonly payload: TIngredient;
};

export type TRemoveIngredient = {
	readonly type: typeof REMOVE_INGREDIENT;
	readonly payload: number;
};

export type TSetIngredients = {
	readonly type: typeof SET_INGREDIENTS;
	readonly payload: Array<TIngredient>;
};

export type TResetConstructor = {
	readonly type: typeof RESET_CONSTRUCTOR;
};

export type TBurgerConstructorActions =
	| TAddIngredient
	| TRemoveIngredient
	| TSetIngredients
	| TResetConstructor;

export type TBurgerConstructorState = {
	ingredients: Array<TIngredient>;
	bun: TIngredient | null;
	isLoading: boolean;
	error: string | null;
};
