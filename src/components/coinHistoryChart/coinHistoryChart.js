import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Line } from 'react-chartjs-2';
import classes from './coinHistoryChart.module.css';

class Chart extends Component {
	state = {
		chartData  : {
			labels   : [ '' ],
			datasets : [
				{
					label                     : 'High $USD',
					fill                      : true,
					lineTension               : 0,
					backgroundColor           : 'rgb(39, 236, 236,0.33)',
					borderColor               : 'rgb(39, 236, 236)',
					borderCapStyle            : 'butt',
					borderDash                : [],
					borderDashOffset          : 0.0,
					borderJoinStyle           : 'miter',
					pointBorderColor          : 'rgb(39, 236, 236)',
					pointBackgroundColor      : '#fff',
					pointBorderWidth          : 3,
					pointHoverRadius          : 7,
					pointHoverBackgroundColor : 'rgb(39, 236, 236)',
					pointHoverBorderColor     : 'rgb(159, 255, 255)',
					pointHoverBorderWidth     : 4,
					pointRadius               : 1,
					pointHitRadius            : 10,
					data                      : null
				},
				{
					label                     : 'Low $USD',
					fill                      : false,
					lineTension               : 0,
					backgroundColor           : 'rgba(34, 60, 177, 0.33)',
					borderColor               : 'rgb(34, 60, 177)',
					borderCapStyle            : 'butt',
					borderDash                : [],
					borderDashOffset          : 0.0,
					borderJoinStyle           : 'miter',
					pointBorderColor          : 'rgb(34, 60, 177)',
					pointBackgroundColor      : '#fff',
					pointBorderWidth          : 3,
					pointHoverRadius          : 7,
					pointHoverBackgroundColor : 'rgb(34, 60, 177)',
					pointHoverBorderColor     : 'rgb(2, 139, 252)',
					pointHoverBorderWidth     : 4,
					pointRadius               : 1,
					pointHitRadius            : 10,
					data                      : null
				},
				{
					label                     : 'Close $USD',
					fill                      : true,
					lineTension               : 0,
					backgroundColor           : 'rgba(75,0,92,0.33)',
					borderColor               : 'rgba(75,0,92,1)',
					borderCapStyle            : 'butt',
					borderDash                : [],
					borderDashOffset          : 0.0,
					borderJoinStyle           : 'miter',
					pointBorderColor          : 'rgba(75,0,92,1)',
					pointBackgroundColor      : '#fff',
					pointBorderWidth          : 3,
					pointHoverRadius          : 7,
					pointHoverBackgroundColor : 'rgba(75,0,92,1)',
					pointHoverBorderColor     : 'rgb(181, 0, 221)',
					pointHoverBorderWidth     : 4,
					pointRadius               : 1,
					pointHitRadius            : 10,
					data                      : null
				}
			]
		},
		minuteData : [],
		hourlyData : [],
		dailyData  : []
	};

	componentDidUpdate (prevProps, prevState) {
		if (this.state.chartData === prevState.chartData) {
			this.minDataChangeHandler();
			this.hrDataChangeHandler();
			this.weekDataChangeHandler();
		}
	}

	shouldComponentUpdate (nextProps, nextState) {
		return (
			this.props.hourlyData !== nextProps.hourlyData ||
			this.state.chartData !== nextState.chartData
		);
	}

	minDataChangeHandler = () => {
		//copy state
		const copiedChartData = { ...this.state.chartData };
		//get data from prop
		const minData = this.props.minuteData;

		//high price data array
		const highData = minData.map(({ high }) => {
			return high;
		});
		//low price data array
		const lowData = minData.map(({ low }) => {
			return low;
		});
		//close price data array
		const closeData = minData.map(({ close }) => {
			return close;
		});
		//array of date for Labels
		const dates = minData.map(({ time }) => {
			return time;
		});

		//high chart data array
		copiedChartData.datasets[0].data = highData;
		//low chart data array
		copiedChartData.datasets[1].data = lowData;
		//close chart data array
		copiedChartData.datasets[2].data = closeData;
		//label of dates
		copiedChartData.labels = dates;

		this.setState({ chartData: copiedChartData });
	};

	hrDataChangeHandler = () => {
		//copy state
		const copiedChartData = { ...this.state.chartData };
		//get data from prop
		const hourlyData = this.props.hourlyData;

		//high price data array
		const highData = hourlyData.map(({ high }) => {
			return high;
		});
		//low price data array
		const lowData = hourlyData.map(({ low }) => {
			return low;
		});
		//close price data array
		const closeData = hourlyData.map(({ close }) => {
			return close;
		});
		//array of date for Labels
		const dates = hourlyData.map(({ time }) => {
			return time;
		});

		//high chart data array
		copiedChartData.datasets[0].data = highData;
		//low chart data array
		copiedChartData.datasets[1].data = lowData;
		//close chart data array
		copiedChartData.datasets[2].data = closeData;
		//label of dates
		copiedChartData.labels = dates;

		this.setState({ chartData: copiedChartData });
	};

	weekDataChangeHandler = () => {
		//copy state
		const copiedChartData = { ...this.state.chartData };
		//get data from prop
		const weekData = this.props.dailyData;

		//high price data array
		const highData = weekData.map(({ high }) => {
			return high;
		});
		//low price data array
		const lowData = weekData.map(({ low }) => {
			return low;
		});
		//close price data array
		const closeData = weekData.map(({ close }) => {
			return close;
		});
		//array of date for Labels
		const dates = weekData.map(({ time }) => {
			return time;
		});

		//high chart data array
		copiedChartData.datasets[0].data = highData;
		//low chart data array
		copiedChartData.datasets[1].data = lowData;
		//close chart data array
		copiedChartData.datasets[2].data = closeData;
		//label of dates
		copiedChartData.labels = dates;

		this.setState({ chartData: copiedChartData });
	};

	render () {
		const {
			props                 : { dailyData, minuteData, hourlyData },
			state                 : { chartData },
			minDataChangeHandler,
			hrDataChangeHandler,
			weekDataChangeHandler
		} = this;

		const noData = [ 'No Data' ];
		let buttons = null;
		let thirtyMinBtn = null;
		let hrBtn;
		let weekBtn;
		if (
			chartData.datasets[0].data !== null &&
			chartData.datasets[1].data !== null &&
			chartData.datasets[2].data !== null
		) {
			if (minuteData[0].time[0] !== noData[0]) {
				thirtyMinBtn = (
					<button
						className={classes.Button}
						type="button"
						onClick={minDataChangeHandler}
					>
						30 Minute
					</button>
				);
			}
			if (hourlyData[0].time[0] !== noData[0]) {
				hrBtn = (
					<button
						className={classes.Button}
						type="button"
						onClick={hrDataChangeHandler}
					>
						Hourly
					</button>
				);
			}
			if (dailyData[0].time[0] !== noData[0]) {
				weekBtn = (
					<button
						className={classes.Button}
						type="button"
						onClick={weekDataChangeHandler}
					>
						Week
					</button>
				);
			}
			buttons = (
				<div className={classes.Buttons}>
					<div>{thirtyMinBtn}</div>
					<div>{hrBtn}</div>
					<div>{weekBtn}</div>
				</div>
			);
		}
		return (
			<div className={classes.Chart}>
				<div className={classes.columnOne}>{buttons}</div>
				<div className={classes.columnTwo}>
					<Line
						data={chartData}
						options={{
							maintainAspectRatio : false
						}}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, action) => {
	return {
		minuteData : state.chartData.minuteData,
		hourlyData : state.chartData.hourlyData,
		dailyData  : state.chartData.dailyData
	};
};

export default connect(mapStateToProps)(Chart);
