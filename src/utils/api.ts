export const API_URL_DOMAIN = 'https://norma.nomoreparties.space';
export const INGREDIENTS_URL = `${API_URL_DOMAIN}/api/ingredients`;
export const ORDERS_URL = `${API_URL_DOMAIN}/api/orders`;
import { TIngredient, TUserForm, TUser } from './types';

const AUTH_URL = `${API_URL_DOMAIN}/api/auth`;
const PASSWORD_RESET_URL = `${API_URL_DOMAIN}/api/password-reset`;

type TTokens = {
	accessToken: string;
	refreshToken: string;
};

type TAPIResponseData = {
	data: Array<TIngredient>;
	success: boolean;
	tokens?: TTokens;
	user?: TUser;
};

const setTokens = ({ accessToken, refreshToken }: TTokens) => {
	localStorage.setItem('accessToken', accessToken);
	localStorage.setItem('refreshToken', refreshToken);
};

const getTokens = (): TTokens => {
	return {
		accessToken: localStorage.getItem('accessToken') || '',
		refreshToken: localStorage.getItem('refreshToken') || '',
	};
};

const clearTokens = () => {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
};

export const checkResponse = <T>(res: Response): Promise<T> => {
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
		const refreshData: TAPIResponseData = await checkResponse<TAPIResponseData>(
			res
		);
		if (!refreshData.success || !refreshData.tokens) {
			return Promise.reject(refreshData);
		}
		setTokens(refreshData.tokens);
		return refreshData.tokens;
	} catch (err) {
		if (err instanceof Error && err.message === 'Token is invalid') {
			clearTokens();
		}
		return Promise.reject(err);
	}
};

export const fetchWithRefresh = async <T>(
	url: string,
	options: RequestInit & { headers: Record<string, string> }
): Promise<T> => {
	try {
		const res = await fetch(url, options);
		return await checkResponse<T>(res);
	} catch (err) {
		if (err instanceof Error && err.message === 'jwt expired') {
			const tokens: TTokens = await refreshTokens();
			options.headers.authorization = tokens.accessToken;
			const res = await fetch(url, options);
			return await checkResponse<T>(res);
		} else {
			return Promise.reject(err);
		}
	}
};

export const fetchIngredientsRequest = async (): Promise<
	Array<TIngredient>
> => {
	const res = await fetch(INGREDIENTS_URL);

	const responseData: TAPIResponseData = await checkResponse<TAPIResponseData>(
		res
	);
	if (!responseData.data || !Array.isArray(responseData.data)) {
		throw new Error('Некорректный формат данных с сервера');
	}
	return responseData.data;
};

export const registerUserRequest = async ({
	email,
	password,
	name,
}: TUserForm): Promise<TAPIResponseData> => {
	const res = await fetch(`${AUTH_URL}/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password, name }),
	});
	return checkResponse<TAPIResponseData>(res);
};

export const loginUserRequest = async ({
	email,
	password,
}: Omit<TUserForm, 'name'>): Promise<TUser> => {
	const res = await fetch(`${AUTH_URL}/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	});
	const responseData: TAPIResponseData = await checkResponse<TAPIResponseData>(
		res
	);
	console.log(responseData);
	if (responseData.success && responseData.tokens) {
		setTokens(responseData.tokens);
	}
	if (!responseData.user) {
		throw new Error('User not found');
	}
	return responseData.user;
};

export const getUserRequest = async (): Promise<TUser> => {
	return await fetchWithRefresh<TUser>(`${AUTH_URL}/user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: getTokens().accessToken,
		},
	});
};

export const forgotPasswordRequest = async (email: string): Promise<any> => {
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
	return checkResponse(res);
};

export const resetPasswordRequest = async (form: TUserForm): Promise<any> => {
	const res = await fetch(`${PASSWORD_RESET_URL}/reset`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(form),
	});
	return checkResponse(res);
};

export const updateUserRequest = async (form: TUserForm): Promise<any> => {
	const res = await fetchWithRefresh(`${AUTH_URL}/user`, {
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

	return res;
};

export const logoutUserRequest = async (): Promise<any> => {
	const token = getTokens().accessToken;
	const res = await fetchWithRefresh(`${AUTH_URL}/logout`, {
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
	return res;
};

export const createOrderRequest = async (
	bun: TIngredient,
	ingredients: Array<TIngredient>
): Promise<any> => {
	const res = await fetchWithRefresh(ORDERS_URL, {
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

	return res;
};
