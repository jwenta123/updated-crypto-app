import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	top20         : [],
	allCoins      : [],
	loadingTop20  : true,
	requestHeader : 'Loading data, please wait...',
	assetSelected : ''
};

const assetSelected = (state, action) => {
	return updateObject(state, { assetSelected: action.assetSelected });
};

const fetchDataStart = (state, action) => {
	return updateObject(state, { loadingTop20: true });
};

const fetchDataSuccess = (state, action) => {
	return updateObject(state, {
		top20         : action.top20,
		allCoins      : action.allCoins,
		loadingTop20  : action.loadingTop20,
		requestHeader : action.requestHeader
	});
};

const fetchDataFail = (state, action) => {
	return updateObject(state, {
		requestHeader : action.requestHeader,
		loading       : false
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ASSET_SELECTED:
			return assetSelected(state, action);
		case actionTypes.FETCH_DATA_SUCCESS:
			return fetchDataSuccess(state, action);
		case actionTypes.FETCH_DATA_START:
			return fetchDataStart(state, action);
		case actionTypes.FETCH_DATA_FAIL:
			return fetchDataFail(state, action);
		default:
			return state;
	}
};

export default reducer;
