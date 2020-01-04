import axios from 'axios';
import * as actionTypes from './actionTypes';

import {
	AUTHORIZATION,
	BASE_URL,
	MINUTE_QUERY,
	HOURLY_QUERY,
	DAILY_QUERY,
	QUERY_ENDING
} from '../../api';

import { parseJSON, format } from 'date-fns';

const getValuesByTimeFrame = (query, coin, arrayValue) => {
	const url = `${BASE_URL}/data`;

	return axios.get(
		`${url}${query}${coin}${QUERY_ENDING}${arrayValue}`,
		AUTHORIZATION
	);
};

const fetchChartDataStart = () => {
	return {
		type : actionTypes.FETCH_CHART_DATA_START
	};
};

const fetchChartDataSuccess = (
	mappedMinuteData,
	mappedHourlyData,
	mappedDailyData
) => {
	return {
		type        : actionTypes.FETCH_CHART_DATA_SUCCESS,
		minuteData  : mappedMinuteData,
		hourlyData  : mappedHourlyData,
		dailyData   : mappedDailyData,
		loadingData : false
	};
};

const fetchChartDataFail = (error) => {
	return {
		type  : actionTypes.FETCH_CHART_DATA_FAIL,
		error : error
	};
};

export const fetchChartCoinData = (asset) => {
	const symbol = asset;

	const minuteRequest = getValuesByTimeFrame(MINUTE_QUERY, symbol, '30');
	const hourlyRequest = getValuesByTimeFrame(HOURLY_QUERY, symbol, '24');
	const dailyRequest = getValuesByTimeFrame(DAILY_QUERY, symbol, '7');

	return (dispatch) => {
		dispatch(fetchChartDataStart());
		axios
			.all([ minuteRequest, hourlyRequest, dailyRequest ])
			.then(
				axios.spread((...response) => {
					const { Data: minuteRequest } = response[0].data.Data;
					let mappedMinuteData = [
						{
							time  : [ 'No Data' ],
							high  : [ '0' ],
							low   : [ '0' ],
							close : [ '0' ]
						}
					];
					if (minuteRequest !== undefined) {
						mappedMinuteData = minuteRequest.map(
							({ time, high, low, close }) => {
								return {
									time  : format(
										parseJSON(new Date(time * 1000)),
										'hh:mm: a'
									),
									high,
									low,
									close
								};
							}
						);
					}

					const { Data: hourlyRequest } = response[1].data.Data;
					let mappedHourlyData = [
						{
							time  : [ 'No Data' ],
							high  : [ '0' ],
							low   : [ '0' ],
							close : [ '0' ]
						}
					];

					if (hourlyRequest !== undefined) {
						mappedHourlyData = hourlyRequest.map(
							({ time, high, low, close }) => {
								return {
									time  : format(
										parseJSON(new Date(time * 1000)),
										'HH:mm'
									),
									high,
									low,
									close
								};
							}
						);
					}

					const { Data: dailyRequest } = response[2].data.Data;
					let mappedDailyData = [
						{
							time  : [ 'No Data' ],
							high  : [ '0' ],
							low   : [ '0' ],
							close : [ '0' ]
						}
					];

					if (dailyRequest !== undefined) {
						mappedDailyData = dailyRequest.map(
							({ time, high, low, close }) => {
								return {
									time  : format(
										parseJSON(new Date(time * 1000)),
										'ddd MM/dd/yyyy'
									),
									high,
									low,
									close
								};
							}
						);
					}

					dispatch(
						fetchChartDataSuccess(
							mappedMinuteData,
							mappedHourlyData,
							mappedDailyData
						)
					);
				})
			)
			.catch((error) => {
				dispatch(fetchChartDataFail(error));
			});
	};
};
