import { thunk } from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { ingredientsReducer } from './burger-ingredients/reducer.js';
import { burgerConstructorReducer } from './burger-constructor/reducer.js';
import { reducer as currentIngredientReducer } from './current-ingredient/reducer.js';
import { orderReducer } from './order/reducer.js';

const rootReducer = combineReducers({
	burgerIngredients: ingredientsReducer,
	burgerConstructor: burgerConstructorReducer,
	currentIngredient: currentIngredientReducer,
	order: orderReducer,
});

export const configureStore = (initialState) => {
	return createStore(
		rootReducer,
		initialState,
		composeWithDevTools(applyMiddleware(thunk))
	);
};
