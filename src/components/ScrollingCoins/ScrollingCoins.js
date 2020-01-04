import React, { Component } from 'react';
import * as actions from '../../store/actions/index';

import Ticker from 'react-ticker';
import TopCryptoCoins from '../topCryptoCoins/topCryptoCoins';

import { connect } from 'react-redux';

import classes from './ScrollingCoins.module.css';

class scrollingCoins extends Component {
	render () {
		const {
			props : {
				increaseSpeed,
				decreaseSpeed,
				speed,
				pauseResumeString,
				pauseResume
			}
		} = this;
		return (
			<div className={classes.Height}>
				<h3>Top 20 Cryptocoins</h3>
				<Ticker offset="run-in" speed={speed}>
					{() => (
						<div className={classes.ScrollingCoins}>
							<TopCryptoCoins />
						</div>
					)}
				</Ticker>
				<div className={classes.ButtonDiv}>
					<button type="button" onClick={decreaseSpeed}>
						Slower
					</button>
					<button type="button" onClick={pauseResume}>
						{pauseResumeString}
					</button>
					<button type="button" onClick={increaseSpeed}>
						Faster
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, action) => {
	return {
		speed             : state.scrollingCoinData.speed,
		oldSpeed          : state.scrollingCoinData.oldSpeed,
		pauseResumeString : state.scrollingCoinData.pauseResumeString
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		increaseSpeed : () => {
			dispatch(actions.increaseSpeed());
		},
		decreaseSpeed : () => {
			dispatch(actions.decreaseSpeed());
		},
		pauseResume   : () => {
			dispatch(actions.pauseResume());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(scrollingCoins);
