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
	number: number;
};
