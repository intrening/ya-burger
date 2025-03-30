export const API_URL_DOMAIN = 'https://norma.nomoreparties.space';
export const INGREDIENTS_URL = `${API_URL_DOMAIN}/api/ingredients`;
export const ORDERS_URL = `${API_URL_DOMAIN}/api/orders`;

const AUTH_URL = `${API_URL_DOMAIN}/api/auth`;
const PASSWORD_RESET_URL = `${API_URL_DOMAIN}/api/password-reset`;

const setTokens = ({ accessToken, refreshToken }) => {
	localStorage.setItem('accessToken', accessToken);
	localStorage.setItem('refreshToken', refreshToken);
};

const getTokens = () => {
	return {
		accessToken: localStorage.getItem('accessToken'),
		refreshToken: localStorage.getItem('refreshToken'),
	};
};

const clearTokens = () => {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
};

export const checkResponse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = async () => {
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
		setTokens(refreshData);
		return refreshData;
	} catch (err) {
		if (err.message === 'Token is invalid') {
			clearTokens();
			return await checkResponse(res);
		}
		return Promise.reject(err);
	}
};

export const fetchWithRefresh = async (url, options) => {
	try {
		const res = await fetch(url, options);
		return await checkResponse(res);
	} catch (err) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options);
			return await checkResponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};

export const registerUserRequest = async (email, password, name) => {
	const res = await fetch(`${AUTH_URL}/register`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({ email, password, name }),
	});
	return checkResponse(res);
};

export const loginUserRequest = async (email, password) => {
	const res = await fetch(`${AUTH_URL}/login`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({ email, password }),
	});
	const data = await checkResponse(res);
	if (data.success) {
		setTokens(data);
	}
	return data;
};

export const getUserRequest = async () => {
	const res = await fetchWithRefresh(`${AUTH_URL}/user`, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		headers: {
			'Content-Type': 'application/json',
			Authorization: getTokens().accessToken,
		},
	});
	return res;
};

export const forgotPasswordRequest = async (email) => {
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

export const resetPasswordRequest = async (form) => {
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

export const updateUserRequest = async (form) => {
	console.log('form', form);
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

export const logoutUserRequest = async () => {
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

export const createOrderRequest = async (bun, ingredients) => {
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
