import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import MealPlanActionCreators from './actions/MealPlanActionCreators';

//import './main.css'; 

// Routes
import routes from './routes';

MealPlanActionCreators.getGroceries('data/shopping-list.json');
MealPlanActionCreators.getRecipes('recipes.php');

const Routes = (
  <Router history={browserHistory} >
    { routes }
  </Router>
)

const app = document.getElementById('app');
ReactDOM.render(Routes, app);