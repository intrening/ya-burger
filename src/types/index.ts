import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { TAuthActions } from '../services/auth/types';
import { TBurgerIngredientsActions } from '../services/burger-ingredients/types';
import { TBurgerConstructorActions } from '../services/burger-constructor/types';
import { TOrderActions } from '../services/order/types';
import store from '../services/store';

export type RootState = ReturnType<typeof store.getState>;

export type TAppActions =
	| TAuthActions
	| TBurgerIngredientsActions
	| TBurgerConstructorActions
	| TOrderActions;

export type AppThunk<TReturn = void> = ActionCreator<
	ThunkAction<TReturn, Action, RootState, TAppActions>
>;

export type AppDispatch = typeof store.dispatch;
