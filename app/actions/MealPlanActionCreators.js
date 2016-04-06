'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AppDispatcher = require('../dispatchers/AppDispatcher');

var _ActionTypes = require('../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _RequestService = require('../services/RequestService');

var _RequestService2 = _interopRequireDefault(_RequestService);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

String.prototype.ucfirst = function () {
	return this.charAt(0).toUpperCase() + this.substr(1);
};

exports.default = {

	/*
 keepOnlyThisChapter: (data) => {
 	dispatch({type: ActionTypes.KEEP_AND_CLEAR_CHAPTER, action: data}); 
 },
 */

	getGroceries: function getGroceries(groceriesURL) {

		var promise = _RequestService2.default.getGroceries(groceriesURL);

		(0, _AppDispatcher.dispatchAsync)(promise, {
			request: _ActionTypes2.default.FETCH_GROCERIES,
			success: _ActionTypes2.default.GET_GROCERIES,
			failure: _ActionTypes2.default.FETCH_GROCERIES_FAILED
		}, { groceriesURL: groceriesURL });
	},
	getConsumerNotes: function getConsumerNotes(initials) {

		var promise = _RequestService2.default.getConsumerNotes(initials);

		(0, _AppDispatcher.dispatchAsync)(promise, {
			request: _ActionTypes2.default.FETCH_CONSUMER_NOTES,
			success: _ActionTypes2.default.GET_CONSUMER_NOTES,
			failure: _ActionTypes2.default.FETCH_CONSUMER_NOTES_FAILED
		}, { initials: initials });
	},
	getRecipes: function getRecipes(url) {

		var promise = _RequestService2.default.getRecipes(url);

		(0, _AppDispatcher.dispatchAsync)(promise, {
			request: _ActionTypes2.default.FETCH_RECIPES,
			success: _ActionTypes2.default.GET_RECIPES,
			failure: _ActionTypes2.default.FETCH_RECIPES_FAILED
		}, { url: url });
	},
	getConsumerPlan: function getConsumerPlan(consumer, weeks) {

		for (var i = 0; i < weeks.length; i++) {
			var promise = _RequestService2.default.getConsumerPlan(consumer, weeks[i]);

			(0, _AppDispatcher.dispatchAsync)(promise, {
				request: _ActionTypes2.default.FETCH_CONSUMER_PLAN,
				success: _ActionTypes2.default.GET_CONSUMER_PLAN,
				failure: _ActionTypes2.default.FETCH_CONSUMER_PLAN_FAILED
			}, { consumer: consumer, weeks: weeks });
		}
	}

};