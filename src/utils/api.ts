export const API_URL_DOMAIN = 'https://norma.nomoreparties.space';
export const INGREDIENTS_URL = `${API_URL_DOMAIN}/api/ingredients`;
export const ORDERS_URL = `${API_URL_DOMAIN}/api/orders`;
import { TIngredient, TUserForm } from './types';

const AUTH_URL = `${API_URL_DOMAIN}/api/auth`;
const PASSWORD_RESET_URL = `${API_URL_DOMAIN}/api/password-reset`;

type TTokens = {
	success?: boolean;
	accessToken: string;
	refreshToken: string;
};

interface IApiResponse {
	success: boolean;
	user: {
		email: string;
		name: string;
	};
	accessToken: string;
	refreshToken: string;
}

type TAPIResponseData = {
	data: Array<TIngredient>;
	success: boolean;
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

export const refreshToken = async (): Promise<TTokens> => {
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
		const refreshData = await checkResponse<TTokens>(res);
		if (!refreshData.success) {
			return Promise.reject(refreshData);
		}
		setTokens(refreshData);
		return refreshData;
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
			const refreshData = await refreshToken();
			options.headers.authorization = refreshData.accessToken;
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
}: TUserForm): Promise<IApiResponse> => {
	const res = await fetch(`${AUTH_URL}/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password, name }),
	});
	return checkResponse<IApiResponse>(res);
};

export const loginUserRequest = async ({
	email,
	password,
}: Omit<TUserForm, 'name'>): Promise<IApiResponse> => {
	const res = await fetch(`${AUTH_URL}/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	});
	const data = await checkResponse<IApiResponse>(res);
	if (data.success) {
		setTokens(data);
	}
	return data;
};

export const getUserRequest = async (): Promise<IApiResponse> => {
	return await fetchWithRefresh<IApiResponse>(`${AUTH_URL}/user`, {
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
