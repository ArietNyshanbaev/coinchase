import {currency as currencyType, sortOptions} from '@constants/apiUnitOptions';

const API_URL = 'https://api.coingecko.com/api/v3';

export const fetchCoinList = async ({
	currency = currencyType.EURO,
	sortBy = sortOptions.MARKET_CAP_DESC,
	paginSize,
}) => {
	try {
		const response = await fetch(
			`${API_URL}/coins/markets?vs_currency=${currency}&order=${sortBy}&per_page=${paginSize}`,
		);
		return response.json();
	} catch (error) {
		// Handle error and rollback
	}
};

export const fetchCoinDetail = async coinId => {
	try {
		const response = await fetch(`${API_URL}/coins/${coinId}`);
		return response.json();
	} catch (error) {
		// Handle error and rollback
	}
};
