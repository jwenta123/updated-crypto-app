import React, { Component } from 'react';

import classes from './Layout.module.css';

import Navigation from '../components/UI/Navigation/Navigation';

class Layout extends Component {
	render () {
		return (
			<div>
				<header className={classes.Layout}>
					<Navigation />
				</header>
				{this.props.children}
			</div>
		);
	}
}

export default Layout;
