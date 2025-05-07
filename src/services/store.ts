import { thunk, ThunkDispatch } from 'redux-thunk';
import {
	combineReducers,
	createStore,
	applyMiddleware,
	AnyAction,
} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { TBurgerConstructorState } from './burger-constructor/types';
import { TOrderState } from './order/types';
import { authReducer } from './auth/reducer';
import { TAuthState } from './auth/types';
import { burgerIngredientsReducer } from './burger-ingredients/reducer';
import { TBurgerIngredientsState } from './burger-ingredients/types';
import { burgerConstructorReducer } from './burger-constructor/reducer';
import { orderReducer } from './order/reducer';

export type TStore = {
	burgerIngredients: TBurgerIngredientsState;
	burgerConstructor: TBurgerConstructorState;
	order: TOrderState;
	auth: TAuthState;
};

const rootReducer = combineReducers({
	burgerIngredients: burgerIngredientsReducer,
	burgerConstructor: burgerConstructorReducer,
	order: orderReducer,
	auth: authReducer,
});

export type AppDispatch = ThunkDispatch<TStore, any, AnyAction>;

export const configureStore = (initialState: TStore) => {
	return createStore(
		rootReducer,
		// @ts-expect-error: Redux
		initialState,
		composeWithDevTools(applyMiddleware(thunk))
	);
};
