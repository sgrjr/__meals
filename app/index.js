// index.js but convention is: app-client.js when isomorphic
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import './main.css';

// Routes
import routes from './routes';

const Routes = (
  <Router history={browserHistory} >
    { routes }
  </Router>
)
 
const app = document.getElementById('app');
ReactDOM.render(Routes, app);