import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { socketMiddleware } from './middleware/socketMiddleware';
import { burgerIngredientsReducer } from './burger-ingredients/reducer';
import { burgerConstructorReducer } from './burger-constructor/reducer';
import { orderReducer } from './order/reducer';
import { authReducer } from './auth/reducer';
import feedReducer from './feed/reducer';
import {
	wsConnectionStart,
	wsConnectionClosed,
	wsConnectionError,
	wsGetMessage,
} from './feed/actions';

const rootReducer = combineReducers({
	burgerIngredients: burgerIngredientsReducer,
	burgerConstructor: burgerConstructorReducer,
	order: orderReducer,
	auth: authReducer,
	feed: feedReducer,
});

const initialState = {};

const feedMiddleware = socketMiddleware(
	{
		connect: wsConnectionStart,
		disconnect: wsConnectionClosed,
		onError: wsConnectionError,
		onMessage: wsGetMessage,
	},
	true
);

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(thunk, feedMiddleware))
);

export default store;
