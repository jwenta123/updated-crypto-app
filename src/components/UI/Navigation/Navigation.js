import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navigation.module.css';

class Navigation extends Component {
	render () {
		return (
			<div className={classes.Navigation}>
				<NavLink to="/" exact activeClassName={classes.active}>
					Top 20
				</NavLink>
				<NavLink to="/chart" exact activeClassName={classes.active}>
					Cryptocurrency Search
				</NavLink>
			</div>
		);
	}
}

export default Navigation;
