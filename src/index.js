import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import mainDataReducer from './store/reducer/mainData';
import scrollingCoinsReducer from './store/reducer/scrollingCoins';
import chartReducer from './store/reducer/chart';

import App from './App';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
	mainData          : mainDataReducer,
	scrollingCoinData : scrollingCoinsReducer,
	chartData         : chartReducer
});

const rootElement = document.getElementById('root');
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	rootElement
);
