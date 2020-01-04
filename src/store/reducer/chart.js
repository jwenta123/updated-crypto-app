import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	selectedAsset : '',
	dailyData     : {},
	hourlyData    : {},
	minuteData    : {},
	loadingData   : false
};

const fetchChartDataStart = (state, action) => {
	return updateObject(state, { loadingData: true });
};

const fetchChartDataSuccess = (state, action) => {
	return updateObject(state, {
		minuteData  : action.minuteData,
		hourlyData  : action.hourlyData,
		dailyData   : action.dailyData,
		loadingData : action.loadingData
	});
};

const fetchChartDataFail = (state, action) => {
	return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_CHART_DATA_SUCCESS:
			return fetchChartDataSuccess(state, action);
		case actionTypes.FETCH_CHART_DATA_START:
			return fetchChartDataStart(state, action);
		case actionTypes.FETCH_CHART_DATA_FAIL:
			return fetchChartDataFail(state, action);
		default:
			return state;
	}
};

export default reducer;
