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
import ShoppingListPage from './components/ShoppingListPage';
import FormsIndexPage from './components/Forms/Index';
import Form from './components/Forms/Form';

export default (
	<Route path="/" component={MainApp} >
		<IndexRoute component={DefaultPage} />
		<Route path="/meals" component={MealListPage} />
		<Route path="/plans/:consumer/:plan(/:week)" component={ConsumerMealPlanPage} />
		<Route path="/orders/:consumer" component={ConsumerOrdersPage} />
		<Route path="/forms" component={FormsIndexPage} >
			<Route path=":form" component={Form} />
		</Route>
		<Route path="/shopping/:plan/:weeks/:consumers" component={ShoppingListPage} />
	</Route>
);
