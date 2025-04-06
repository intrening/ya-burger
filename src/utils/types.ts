export type TIngredient = {
	_id: string;
	name: string;
	price: number;
	image: string;
	image_mobile: string;
	type: string;
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

export type TUserRegisterForm = {
	email: string;
	name: string;
	password: string;
};

export type TOrder = {
	number: number;
};
