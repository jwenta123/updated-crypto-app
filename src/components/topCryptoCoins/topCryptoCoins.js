import React, { Component } from 'react';

import classes from './topCryptoCoins.module.css';
import { connect } from 'react-redux';

const topCryptoCoinStyle = {
	fontSize    : '30px',
	display     : 'inline-block',
	padding     : '20px 0px',
	marginRight : '40px',
	width       : '300px'
};

const imgOpacity = {
	opacity : '75% !important'
};

class topCryptoCoins extends Component {
	shouldComponentUpdate (nextProps) {
		return this.props.top20 !== nextProps.top20;
	}

	renderTickers (sortedPriceList) {
		return sortedPriceList.slice(0, 20).map((sortedItem) => {
			return (
				<div key={sortedItem.assetId} style={topCryptoCoinStyle}>
					<div className={classes.card}>
						<div style={imgOpacity}>
							<img
								className={classes.img}
								src={sortedItem.img}
								alt={sortedItem.img}
							/>
						</div>
						<div className={classes.cryptoCoins}>
							<div>{sortedItem.name}</div>
							<div>({sortedItem.assetId})</div>
							<div className={classes.price}>
								${sortedItem.price.toFixed(2)}
							</div>
						</div>
					</div>
				</div>
			);
		});
	}

	render () {
		const sortedPriceList = this.props.top20.sort(
			(a, b) => (a.price > b.price ? -1 : 1)
		);
		return this.renderTickers(sortedPriceList);
	}
}

const mapStateToProps = (state) => {
	return {
		top20 : state.mainData.top20
	};
};

export default connect(mapStateToProps)(topCryptoCoins);
