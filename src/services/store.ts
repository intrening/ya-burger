import { thunk } from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
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

export const configureStore = (initialState: TStore) => {
	return createStore(
		rootReducer,
		// @ts-expect-error: Redux
		initialState,
		composeWithDevTools(applyMiddleware(thunk))
	);
};
