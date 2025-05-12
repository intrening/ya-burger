export const API_URL_DOMAIN = 'https://norma.nomoreparties.space';
export const INGREDIENTS_URL = `${API_URL_DOMAIN}/api/ingredients`;
export const ORDERS_URL = `${API_URL_DOMAIN}/api/orders`;
import {
	TIngredient,
	TUser,
	TUserLoginForm,
	TUserRegisterUpdateForm,
	TUserResetPasswordForm,
	TOrder,
} from '../types';

const AUTH_URL = `${API_URL_DOMAIN}/api/auth`;
const PASSWORD_RESET_URL = `${API_URL_DOMAIN}/api/password-reset`;

type TTokens = {
	accessToken: string;
	refreshToken: string;
};

type TAPIResponseData = {
	success: boolean;
	data: Array<TIngredient>;
	user?: TUser;
	accessToken?: string;
	refreshToken?: string;
	order?: {
		number: number;
	};
	orders?: Array<TOrder>;
	message?: string;
};

const setTokens = (responseData: TAPIResponseData): TTokens => {
	localStorage.setItem('accessToken', responseData.accessToken || '');
	localStorage.setItem('refreshToken', responseData.refreshToken || '');
	return {
		accessToken: responseData.accessToken || '',
		refreshToken: responseData.refreshToken || '',
	};
};

export const getTokens = (): TTokens => {
	return {
		accessToken: localStorage.getItem('accessToken') || '',
		refreshToken: localStorage.getItem('refreshToken') || '',
	};
};

const clearTokens = () => {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
};

export const parseApiError = (error: unknown): string => {
	if (error instanceof Object && 'message' in error) {
		return (error as { message: string }).message;
	}
	return 'Неизвестная ошибка';
};

export const checkResponse = (res: Response): Promise<TAPIResponseData> => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshTokens = async (): Promise<TTokens> => {
	try {
		const res = await fetch(`${AUTH_URL}/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				token: getTokens().refreshToken,
			}),
		});
		const refreshData = await checkResponse(res);
		if (!refreshData.success) {
			return Promise.reject(refreshData);
		}
		return setTokens(refreshData);
	} catch (err) {
		if (parseApiError(err) === 'Token is invalid') {
			clearTokens();
		}
		return Promise.reject(err);
	}
};

export const fetchWithRefresh = async (
	url: string,
	options: RequestInit & { headers: Record<string, string> }
): Promise<TAPIResponseData> => {
	try {
		const res = await fetch(url, options);
		return await checkResponse(res);
	} catch (err) {
		if (parseApiError(err) === 'jwt expired') {
			const tokens: TTokens = await refreshTokens();
			options.headers.authorization = tokens.accessToken;
			const res = await fetch(url, options);
			return await checkResponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};

export const fetchIngredientsRequest = async (): Promise<
	Array<TIngredient>
> => {
	const res = await fetch(INGREDIENTS_URL);

	const responseData = await checkResponse(res);
	if (!responseData.data || !Array.isArray(responseData.data)) {
		throw new Error('Некорректный формат данных с сервера');
	}
	return responseData.data;
};

export const registerUserRequest = async ({
	email,
	password,
	name,
}: TUserRegisterUpdateForm): Promise<TAPIResponseData> => {
	const res = await fetch(`${AUTH_URL}/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password, name }),
	});
	return await checkResponse(res);
};

export const loginUserRequest = async ({
	email,
	password,
}: TUserLoginForm): Promise<TUser> => {
	const res = await fetch(`${AUTH_URL}/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	});
	const responseData = await checkResponse(res);
	setTokens(responseData);
	if (!responseData.user) {
		throw new Error('User not found');
	}
	return responseData.user;
};

export const getUserRequest = async (): Promise<TUser> => {
	const res = await fetchWithRefresh(`${AUTH_URL}/user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: getTokens().accessToken,
		},
	});
	if (!res.success || !res.user) {
		throw new Error('User not found');
	}
	return res.user;
};

export const forgotPasswordRequest = async (email: string): Promise<void> => {
	const res = await fetch(`${PASSWORD_RESET_URL}`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email }),
	});
	await checkResponse(res);
};

export const resetPasswordRequest = async (
	form: TUserResetPasswordForm
): Promise<void> => {
	const responseData = await fetch(`${PASSWORD_RESET_URL}/reset`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(form),
	});
	await checkResponse(responseData);
};

export const updateUserRequest = async (
	form: TUserRegisterUpdateForm
): Promise<TUser> => {
	const responseData = await fetchWithRefresh(`${AUTH_URL}/user`, {
		method: 'PATCH',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			Authorization: getTokens().accessToken,
		},
		body: JSON.stringify(form),
	});
	if (!responseData.success || !responseData.user) {
		throw new Error('User not found');
	}
	return responseData.user;
};

export const logoutUserRequest = async (): Promise<void> => {
	const token = getTokens().accessToken;
	await fetchWithRefresh(`${AUTH_URL}/logout`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			token: getTokens().refreshToken,
		}),
	});
	clearTokens();
};

export const createOrderRequest = async (
	bun: TIngredient,
	ingredients: Array<TIngredient>
): Promise<number> => {
	const responseData = await fetchWithRefresh(ORDERS_URL, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			Authorization: getTokens().accessToken,
		},
		body: JSON.stringify({
			ingredients: [bun._id, ...ingredients.map((item) => item._id), bun._id],
		}),
	});

	if (
		!responseData.success ||
		!responseData.order ||
		!responseData.order.number
	) {
		throw new Error('Некорректный формат данных с сервера');
	}
	return responseData.order.number;
};

export const fetchOrderDetails = async (orderId: string): Promise<TOrder> => {
	const responseData = await fetchWithRefresh(`${ORDERS_URL}/${orderId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (!responseData.success || !responseData.orders) {
		throw new Error('Некорректный формат данных с сервера');
	}
	return responseData.orders[0] as TOrder;
};
