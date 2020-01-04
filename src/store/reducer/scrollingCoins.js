import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	speed             : 18,
	oldSpeed          : null,
	pauseResumeString : 'Pause'
};

const increaseSpeed = (state, action) => {
	return updateObject(state, {
		speed             : action.speed,
		pauseResumeString : action.pauseResumeString
	});
};

const decreaseSpeed = (state, action) => {
	return updateObject(state, {
		speed             : action.speed,
		pauseResumeString : action.pauseResumeString
	});
};

const pauseResume = (state, action) => {
	return updateObject(state, {
		speed             : action.speed,
		oldSpeed          : action.oldSpeed,
		pauseResumeString : action.pauseResumeString
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.INCREASE_SCROLL_SPEED:
			return increaseSpeed(state, action);
		case actionTypes.DECREASE_SCROLL_SPEED:
			return decreaseSpeed(state, action);
		case actionTypes.PAUSE_RESUME:
			return pauseResume(state, action);
		default:
			return state;
	}
};

export default reducer;
