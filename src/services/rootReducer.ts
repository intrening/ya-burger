import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients/reducer';
import { burgerConstructorReducer } from './burger-constructor/reducer';
import { orderReducer } from './order/reducer';
import { authReducer } from './auth/reducer';
import feedReducer from './feed/reducer';

const rootReducer = combineReducers({
	burgerIngredients: burgerIngredientsReducer,
	burgerConstructor: burgerConstructorReducer,
	order: orderReducer,
	auth: authReducer,
	feed: feedReducer,
});

export default rootReducer;
