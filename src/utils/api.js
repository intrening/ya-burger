export const API_URL_DOMAIN = 'https://norma.nomoreparties.space';
export const INGREDIENTS_URL = `${API_URL_DOMAIN}/api/ingredients`;
export const ORDERS_URL = `${API_URL_DOMAIN}/api/orders`;

export const checkResponse = async (response, errorPrefix = 'API Error') => {
	if (!response.ok) {
		const errorData = await response.json().catch(() => null);
		throw new Error(
			errorData?.message ||
				`${errorPrefix}: ${response.status} ${response.statusText}`
		);
	}

	const data = await response.json();

	if (!data.success) {
		throw new Error(data.message || 'API вернул неуспешный статус');
	}

	return data;
};
