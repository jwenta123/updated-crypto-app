import React, { Component, Fragment } from 'react';
import classes from './Title.module.css';

class Title extends Component {
	render () {
		const { title, children, img } = this.props;
		let titleComponent = null;
		let image;
		if (img) {
			image = <img src={img} alt="Logo" />;
		}
		if (title !== '') {
			titleComponent = (
				<div>
					<h2 className={classes.Title}>
						{title}
						{image}
					</h2>

					{children}
				</div>
			);
		}
		return <Fragment>{titleComponent} </Fragment>;
	}
}

export default Title;
