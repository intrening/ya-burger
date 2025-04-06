import { thunk, ThunkDispatch } from 'redux-thunk';
import {
	combineReducers,
	createStore,
	applyMiddleware,
	AnyAction,
} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { ingredientsReducer } from './burger-ingredients/reducer';
import { burgerConstructorReducer } from './burger-constructor/reducer';
import { orderReducer } from './order/reducer';
import { authReducer } from './auth/reducer';
import { TStore } from './types';

const rootReducer = combineReducers({
	burgerIngredients: ingredientsReducer,
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
