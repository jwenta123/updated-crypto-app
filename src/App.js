import React, { Component } from 'react';
import './App.css';
import Layout from './Layout/Layout';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import { Route, Switch } from 'react-router-dom';

import ScrollingCoins from './components/ScrollingCoins/ScrollingCoins';
import Spinner from './components/UI/Spinner/Spinner';
import classes from './components/UI/AutoComplete/Autocomplete.module.css';

import Title from './components/UI/Title/Title';
import Chart from './components/coinHistoryChart/coinHistoryChart';

const spinnerStyle = { margin: 'auto' };

const searchStyle = { width: '100%', margin: 'auto' };

class App extends Component {
	state = {
		// The active selection's index
		activeSuggestion    : 0,
		// The suggestions that match the user's input
		filteredSuggestions : [],
		// Whether or not the suggestion list is shown
		showSuggestions     : false,
		// What the user has entered
		userInput           : '',
		title               : 'CryptoCurrency ID will be displayed here!',
		loadingSuggestion   : false,
		enterPressed        : false,
		//updates image source
		activeImgSrc        : '',
		//changes image when coin is selected
		selectedAssetImgSrc : ''
	};

	componentDidMount () {
		this.props.onFetchData();
	}

	//Check for 3 or more characters first
	threeKeysEnteredCheck = (e) => {
		const userInput = e.target.value;
		const inputLengthCheck = () =>
			this.state.userInput.length > 2 ? this.onChange() : null;
		this.setState({ userInput }, () => inputLengthCheck());
	};
	//then
	// Event fired when the input value is changed
	onChange = (e) => {
		const userInput = this.state.userInput;
		const suggestions = this.props.allCoins;

		const setLoading = async () =>
			this.setState({
				loadingSuggestion : true,
				enterPressed      : false
			});
		// Filter our suggestions that don't contain the user's input
		let filteredSuggestions;
		setLoading()
			.then(
				(filteredSuggestions = suggestions.filter((suggestion) => {
					const name =
						suggestion.name + ` (${suggestion.assetId})` || '';
					return (
						name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
					);
				}))
			)
			.then(
				// Update the user input and filtered suggestions, reset the active
				// suggestion and make sure the suggestions are shown
				this.setState({
					activeSuggestion    : 0,
					filteredSuggestions,
					showSuggestions     : true,
					loadingSuggestion   : false
				})
			);
	};

	// Event fired when the user clicks on a suggestion
	onClickHandler = (e, img) => {
		const regExp = e.currentTarget.innerText.match(/\((.*?)\)/);
		// Update the user input and reset the rest of the state
		this.setState({
			activeImgSrc        : img,
			activeSuggestion    : 0,
			filteredSuggestions : [],
			showSuggestions     : false,
			userInput           : e.currentTarget.innerText
		});
		if (regExp) {
			this.props.onAssetSelected(regExp[1]);
		}
	};

	// Event fired when the user presses a key down
	onKeyDown = (e, img) => {
		const { activeSuggestion, filteredSuggestions } = this.state;

		// User pressed the enter key, update the input and close the
		// suggestions
		if (e.keyCode === 13) {
			const { name } = filteredSuggestions[activeSuggestion];
			const { assetId } = filteredSuggestions[activeSuggestion];

			const selectedInput = `${name} (${assetId})`;
			this.setState({
				activeImgSrc     : img,
				activeSuggestion : 0,
				showSuggestions  : false,
				userInput        : selectedInput,
				enterPressed     : true
			});
			this.props.onAssetSelected(assetId);
		} else if (e.keyCode === 38) {
			// User pressed the up arrow, decrement the index
			if (activeSuggestion === 0) {
				return;
			}

			this.setState({ activeSuggestion: activeSuggestion - 1 });
		} else if (e.keyCode === 40) {
			// User pressed the down arrow, increment the index
			if (activeSuggestion - 1 === filteredSuggestions.length) {
				return;
			}

			this.setState({ activeSuggestion: activeSuggestion + 1 });
		}
	};

	titleChangeHandler = () => {
		this.setState({
			title               : this.props.assetSelected,
			selectedAssetImgSrc : this.state.activeImgSrc
		});
	};

	render () {
		const {
			onClickHandler,
			onKeyDown,
			titleChangeHandler,
			threeKeysEnteredCheck,
			state                 : {
				activeSuggestion,
				filteredSuggestions,
				showSuggestions,
				userInput,
				title,
				loadingSuggestion,
				enterPressed,
				activeImgSrc,
				selectedAssetImgSrc
			},
			props                 : {
				top20,
				loadingTop20,
				requestHeader,
				assetSelected,
				onFetchChartCoinData,
				loadingData
			}
		} = this;

		let suggestionsListComponent;

		if (showSuggestions && userInput) {
			if (loadingSuggestion) {
				suggestionsListComponent = <Spinner />;
			} else {
				if (filteredSuggestions.length) {
					suggestionsListComponent = (
						<ul className={classes.suggestions}>
							{filteredSuggestions.map(
								({ img, assetId, name }, index) => {
									let dynamicStyling;

									// Flag the active suggestion with a class
									if (index === activeSuggestion) {
										dynamicStyling =
											classes.suggestionActive;
									}
									if (
										index === activeSuggestion &&
										activeImgSrc !== img
									) {
										this.setState({
											activeImgSrc : img
										});
									}
									const image = (
										<img
											src={img}
											alt="Logo"
											className={classes.Img}
										/>
									);
									return (
										<li
											className={dynamicStyling}
											key={`${assetId}${index}`}
											onClick={(e) => {
												onClickHandler(e, img);
											}}
										>
											<div
												className={classes.liColumnOne}
											>
												{image}
											</div>
											<div
												className={classes.liColumnTwo}
											>
												{`${name} (${assetId})`}
											</div>
										</li>
									);
								}
							)}
						</ul>
					);
				} else {
					suggestionsListComponent = (
						<div className={classes.noSuggestions}>
							No suggestions, you're on your own!
						</div>
					);
				}
			}
		}

		let scrollingCoins = <Spinner />;
		if (!loadingTop20) {
			if (top20.length) {
				const scrollingCoinsSet = async () =>
					(scrollingCoins = <ScrollingCoins />);
				scrollingCoinsSet();
			}
		}

		let button = null;

		if (
			(assetSelected !== '' &&
				{ suggestionsListComponent } !==
					(
						<div className={classes.noSuggestions}>
							No suggestions, you're on your own!
						</div>
					)) ||
			(assetSelected !== '' && enterPressed)
		) {
			button = (
				<button
					className="Button"
					type="button"
					onClick={() => {
						onFetchChartCoinData(assetSelected);
						titleChangeHandler();
					}}
				>
					Update Chart
				</button>
			);
		}

		let spinner = <Spinner style={spinnerStyle} />;
		if (!loadingData) {
			spinner = null;
		}
		return (
			<div className="App">
				<Layout>
					<header className={classes.Header}>{requestHeader}</header>
					<Switch>
						<Route path="/" exact>
							<div>{scrollingCoins}</div>
						</Route>
						<Route path="/chart">
							<div style={searchStyle}>
								<div className={classes.Comp}>
									<div
										className={
											classes.InputAndSuggestionBox
										}
									>
										<div>
											<input
												className={classes.input}
												type="text"
												onChange={threeKeysEnteredCheck}
												onKeyDown={(e) => {
													onKeyDown(e, activeImgSrc);
												}}
												value={userInput}
												placeholder="Search for cryptocurrency!"
											/>
										</div>
										<div>{suggestionsListComponent}</div>
									</div>
									{button}
								</div>
							</div>
							<Title title={title} img={selectedAssetImgSrc}>
								{spinner}
							</Title>
							<Chart />
						</Route>
					</Switch>
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = (state, action) => {
	return {
		top20         : state.mainData.top20,
		loadingTop20  : state.mainData.loadingTop20,
		allCoins      : state.mainData.allCoins,
		requestHeader : state.mainData.requestHeader,
		assetSelected : state.mainData.assetSelected,
		loadingData   : state.chartData.loadingData
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchData          : () => dispatch(actions.fetchData()),
		onAssetSelected      : (assetList) =>
			dispatch(actions.assetSelected(assetList)),
		onFetchChartCoinData : (asset) =>
			dispatch(actions.fetchChartCoinData(asset))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
