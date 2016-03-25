// routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router';

// Main component
import App from './components/App';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={App}></IndexRoute>
		<Route path=":consumer/:weeks" component={App}/>
		<Route path="*" component={App}/>
	</Route>
);