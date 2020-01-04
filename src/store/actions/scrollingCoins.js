import * as actionTypes from './actionTypes';

let speed = 18;
let pauseResumeString = 'Pause';
let oldSpeed = null;

export const initialSpeed = () => {
	return {
		type  : actionTypes.INTIAL_SPEED,
		speed : speed
	};
};

export const increaseSpeed = () => {
	speed += 10;
	return {
		type              : actionTypes.INCREASE_SCROLL_SPEED,
		speed             : speed,
		pauseResumeString : 'Pause'
	};
};

export const decreaseSpeed = () => {
	speed -= 10;
	if (speed <= 0) {
		speed = 0;
		pauseResumeString = 'Stopped';
	} else {
		// eslint-disable-next-line no-self-assign
		speed = speed;
	}
	return {
		type              : actionTypes.DECREASE_SCROLL_SPEED,
		speed             : speed,
		pauseResumeString : pauseResumeString
	};
};

export const pauseResume = () => {
	if (speed === 0 && oldSpeed === null) {
		speed = 0;
		pauseResumeString = 'Resume';
		oldSpeed = 0;
	} else if (speed !== 0) {
		oldSpeed = speed;
		speed = 0;
		pauseResumeString = 'Resume';
	} else if (speed === 0 && oldSpeed !== null) {
		speed = oldSpeed;
		oldSpeed = speed;
		pauseResumeString = 'Pause';
	}
	return {
		type              : actionTypes.PAUSE_RESUME,
		speed             : speed,
		oldSpeed          : oldSpeed,
		pauseResumeString : pauseResumeString
	};
};
