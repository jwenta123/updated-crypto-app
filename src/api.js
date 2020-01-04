export const AUTHORIZATION = {
	headers : {
		authorization :
			'046b7f8dc0deb9334d38729b9e1a1fbca127e3195a618556295566219240f6f7'
	}
};
const PROXY = 'https://cors-anywhere.herokuapp.com/';
export const BASE_URL = `${PROXY}https://min-api.cryptocompare.com`;
export const TOP_20_URL_QUERY = '/data/top/totalvolfull?limit=20&tsym=USD';
export const ALL_COIN_QUERY = '/data/all/coinlist';
export const BASE_IMG_URL = 'https://cryptocompare.com';
export const MINUTE_QUERY = '/v2/histominute?fsym=';
export const HOURLY_QUERY = '/v2/histohour?fsym=';
export const DAILY_QUERY = '/v2/histoday?fsym=';
export const QUERY_ENDING = '&tsym=USD&limit=';
