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

exports.default = {

	getConsumerOrders: function getConsumerOrders(initials) {

		var promise = _RequestService2.default.getConsumerNotes(initials);

		(0, _AppDispatcher.dispatchAsync)(promise, {
			request: _ActionTypes2.default.REQUEST_CONSUMER_ORDERS,
			success: _ActionTypes2.default.GET_CONSUMER_ORDERS,
			failure: _ActionTypes2.default.REQUEST_CONSUMER_ORDERS_FAILED
		}, { initials: initials });
	}

};