export type TIngredientId = string;

export type TIngredient = {
	_id: TIngredientId;
	name: string;
	price: number;
	image: string;
	image_mobile: string;
	type: string;
	uuid: string;
	image_large: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
};

export type TIngredientCategory = {
	id: string;
	title: string;
	ingredients: Array<TIngredient>;
	ref: React.RefObject<HTMLDivElement>;
};

export type TUser = {
	email: string;
	name: string;
};

export type TUserRegisterUpdateForm = TUser & {
	password: string;
};

export type TUserLoginForm = {
	email: string;
	password: string;
};

export type TUserResetPasswordForm = {
	password: string;
	token: string;
};

export type TOrder = {
	_id: string;
	status: string;
	number: number;
	createdAt: string;
	updatedAt: string;
	ingredients: Array<TIngredientId>;
};
