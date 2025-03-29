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
		localStorage.setItem('refreshToken', data.refreshToken);
		localStorage.setItem('accessToken', data.accessToken);
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
			Authorization: localStorage.getItem('accessToken'),
		},
	});
	return res;
};

export const forgotPasswordRequest = async (email) => {
	const res = await fetch(`${AUTH_URL}/forgot-password`, {
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
	const res = await fetch(`${AUTH_URL}/reset-password`, {
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
			Authorization: localStorage.getItem('accessToken'),
		},
		body: JSON.stringify(form),
	});

	return res;
};

export const logoutUserRequest = async () => {
	const token = localStorage.getItem('accessToken');
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
			token: localStorage.getItem('refreshToken'),
		}),
	});
	localStorage.removeItem('refreshToken');
	localStorage.removeItem('accessToken');
	return res;
};
