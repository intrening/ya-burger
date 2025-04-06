export type TIngredient = {
	_id: string;
	name: string;
	price: number;
	image: string;
	image_mobile: string;
};

export type TUser = {
	email: string;
	name: string;
};

export type TUserForm = {
	email: string;
	name?: string;
	password: string;
};

type TAuthState = {
	user: TUser | null;
	authError: string | null;
	isAuthChecked: boolean;
};

type TOrderState = {
	orderNumber: number | null;
	loading: boolean;
	error: string | null;
};

type TIngredientsState = {
	ingredients: Array<TIngredient>;
	isLoading: boolean;
	error: string | null;
};

type TConstructorState = {
	ingredients: Array<TIngredient>;
	bun: TIngredient | null;
	isLoading: boolean;
	error: string | null;
};

export type TStore = {
	burgerIngredients: TIngredientsState;
	burgerConstructor: TConstructorState;
	order: TOrderState;
	auth: TAuthState;
};
