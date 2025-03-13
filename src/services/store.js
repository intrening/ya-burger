import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { ingredientsReducer } from './burger-ingredients/reducer.js';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
});

export const configureStore = (initialState) => {
	return createStore(
		rootReducer,
		initialState,
		composeWithDevTools(applyMiddleware(thunk))
	);
};
