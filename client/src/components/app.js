import { Component } from 'preact';
import Router from 'preact-router';

import Home from '../routes/home';
import Game from '../routes/game';

// Code-splitting is automated for routes

export default class App extends Component {
	
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<Router>
				<Home path="/" />
				<Game path="/game/:token" />
			</Router>
		);
	}
}
