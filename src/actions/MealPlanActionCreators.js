'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

import { dispatch } from '../dispatchers/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
var RequestService = require('../services/RequestService');


function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

String.prototype.ucfirst = function () {
	return this.charAt(0).toUpperCase() + this.substr(1);
};

exports.default = {

	getGroceries: function getGroceries() {

		var groceries = require('../../static/data/shopping-list.json');	
		dispatch(ActionTypes.GET_GROCERIES, {body:groceries});
	
	},
	getConsumerNotes: function getConsumerNotes(initials) {	
		
		var notes = require('../../static/data/'+initials+'/notes.json');

		dispatch(ActionTypes.GET_CONSUMER_NOTES, {body:notes});
		
		/*
		var promise = _RequestService2.default.getConsumerNotes(initials);

		(0, _AppDispatcher.dispatchAsync)(promise, {
			request: _ActionTypes2.default.FETCH_CONSUMER_NOTES,
			success: _ActionTypes2.default.GET_CONSUMER_NOTES,
			failure: _ActionTypes2.default.FETCH_CONSUMER_NOTES_FAILED
		}, { initials: initials });
		
		*/
	},
	getRecipes: function getRecipes(url) {
		
		var recipes = require('../../static/recipes.json');
		
		dispatch(ActionTypes.GET_RECIPES, {body:recipes.data});
		/*
		var promise = _RequestService2.default.getRecipes(url);

		(0, _AppDispatcher.dispatchAsync)(promise, {
			request: _ActionTypes2.default.FETCH_RECIPES,
			success: _ActionTypes2.default.GET_RECIPES,
			failure: _ActionTypes2.default.FETCH_RECIPES_FAILED
		}, { url: url });
		*/
	},
	getConsumerPlan: function getConsumerPlan(consumer, plan) {
		
		var plan = require('../../static/data/'+consumer+'/'+plan+'.json');
		
		dispatch(ActionTypes.GET_CONSUMER_PLAN, {action: {plan:plan} ,body:plan});
		
			/*
			
			var promise = _RequestService2.default.getConsumerPlan(consumer, plan);

			(0, _AppDispatcher.dispatchAsync)(promise, {
				request: _ActionTypes2.default.FETCH_CONSUMER_PLAN,
				success: _ActionTypes2.default.GET_CONSUMER_PLAN,
				failure: _ActionTypes2.default.FETCH_CONSUMER_PLAN_FAILED
			}, { consumer: consumer, plan: plan });
			*/
	}

};