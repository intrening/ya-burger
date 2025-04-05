export type TIngredient = {
	_id: string;
	name: string;
	price: number;
	image: string;
	image_mobile: string;
};

export type TUserForm = {
	email: string;
	password: string;
	name?: string;
};
