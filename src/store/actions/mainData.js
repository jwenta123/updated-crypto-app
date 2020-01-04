import * as actionTypes from './actionTypes';
import axios from 'axios';

import {
	AUTHORIZATION,
	BASE_URL,
	TOP_20_URL_QUERY,
	ALL_COIN_QUERY,
	BASE_IMG_URL
} from '../../api';

//'get' requests for axios
const top20Request = axios.get(`${BASE_URL}${TOP_20_URL_QUERY}`, AUTHORIZATION);

const allCoinsRequest = axios.get(
	`${BASE_URL}${ALL_COIN_QUERY}`,
	AUTHORIZATION
);

export const assetSelected = (assetList) => {
	return {
		type          : actionTypes.ASSET_SELECTED,
		assetSelected : assetList
	};
};

export const fetchDataStart = () => {
	return {
		type : actionTypes.FETCH_DATA_START
	};
};

export const fetchDataSuccess = (noPriceDataFiltered, withoutDupeCoins) => {
	return {
		type          : actionTypes.FETCH_DATA_SUCCESS,
		top20         : noPriceDataFiltered,
		allCoins      : withoutDupeCoins,
		loadingTop20  : false,
		requestHeader : 'CryptoCurrency Values in $USD'
	};
};

export const fetchDataFail = (error) => {
	return {
		type          : actionTypes.FETCH_DATA_FAIL,
		requestHeader : 'Failed to retrieve data',
		error         : error
	};
};

export const fetchData = () => {
	return (dispatch) => {
		dispatch(fetchDataStart());
		//async await all get requests
		axios
			.all([ top20Request, allCoinsRequest ])
			.then(
				axios.spread((...response) => {
					//retrieve top 20 crypto data
					const topTwentyRequest = Object.values(
						response[0].data.Data
					);
					const mapped = topTwentyRequest.map(({ CoinInfo, RAW }) => {
						const { FullName, Name, ImageUrl } = CoinInfo;

						return {
							name    : FullName,
							assetId : Name,
							price   : RAW.USD.PRICE,
							img     : `${BASE_IMG_URL}${ImageUrl}`
						};
					});
					const withoutDupeCoinsData = mapped.reduce((unique, o) => {
						if (
							!unique.some(
								(obj) =>
									obj.name === o.name &&
									obj.assetId === o.assetId
							)
						) {
							unique.push(o);
						}
						return unique;
					}, []);

					const noPriceDataFiltered = withoutDupeCoinsData.filter(
						(coinObject) => {
							return coinObject.price && coinObject.name;
						}
					);

					//retrieve all coins details
					const coins = Object.values(response[1].data.Data);
					const mappedCoins = coins.map(
						({ CoinName, Name, ImageUrl }) => {
							return {
								name    : CoinName,
								assetId : Name,
								img     : `${BASE_IMG_URL}${ImageUrl}`
							};
						}
					);
					const withoutDupeCoins = mappedCoins.reduce((unique, o) => {
						if (
							!unique.some(
								(obj) =>
									obj.name === o.name &&
									obj.assetId === o.assetId
							)
						) {
							unique.push(o);
						}
						return unique;
					}, []);

					dispatch(
						fetchDataSuccess(noPriceDataFiltered, withoutDupeCoins)
					);
				})
			)
			.catch((error) => {
				dispatch(fetchDataFail(error));
			});
	};
};
