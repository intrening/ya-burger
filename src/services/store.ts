import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { socketMiddleware } from './middleware/socketMiddleware';

import { burgerIngredientsReducer } from './burger-ingredients/reducer';
import { burgerConstructorReducer } from './burger-constructor/reducer';
import { orderReducer } from './order/reducer';
import { authReducer } from './auth/reducer';
import { feedReducer } from './feed/reducer';
const rootReducer = combineReducers({
	burgerIngredients: burgerIngredientsReducer,
	burgerConstructor: burgerConstructorReducer,
	order: orderReducer,
	auth: authReducer,
	feed: feedReducer,
});

const initialState = {};

const WS_URL = 'wss://norma.nomoreparties.space/orders/all';

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(thunk, socketMiddleware(WS_URL)))
);

export default store;
