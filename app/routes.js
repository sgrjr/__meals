// routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router';

// Main Component
import MainApp from './components/App';

// Page Components
import ConsumerMealPlanPage from './components/ConsumerMealPlanPage';
import ConsumerOrdersPage from './components/ConsumerOrdersPage';
import DefaultPage from './components/DefaultPage';
import MealListPage from './components/MealListPage';

export default (
	<Route path="/" component={MainApp} >
		<IndexRoute component={DefaultPage} />
		<Route path="/meals" component={MealListPage} />
		<Route path="/plans/:consumer/:weeks" component={ConsumerMealPlanPage} />
		<Route path="/orders/:consumer" component={ConsumerOrdersPage} />
	</Route>
);
