export const API_URL_DOMAIN = 'https://norma.nomoreparties.space';
export const INGREDIENTS_URL = `${API_URL_DOMAIN}/api/ingredients`;
export const ORDERS_URL = `${API_URL_DOMAIN}/api/orders`;

const AUTH_URL = `${API_URL_DOMAIN}/api/auth`;

export const checkResponse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
	return fetch(`${AUTH_URL}/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then(checkResponse)
		.then((refreshData) => {
			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}
			localStorage.setItem('refreshToken', refreshData.refreshToken);
			localStorage.setItem('accessToken', refreshData.accessToken);
			return refreshData;
		});
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

export const apiRegisterUser = async (email, password, name) => {
	const response = await fetch(`${AUTH_URL}/register`, {
		method: 'POST',
		body: JSON.stringify({ email, password, name }),
	});

	const data = await checkResponse(response);

	return data;
};

export const apiLoginUser = async (email, password) => {
	const response = await fetch(`${AUTH_URL}/login`, {
		method: 'POST',
		body: JSON.stringify({ email, password }),
	});

	const data = await checkResponse(response);

	return data;
};
