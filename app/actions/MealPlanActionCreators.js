import { dispatch, dispatchAsync } from '../dispatchers/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import RequestService from '../services/RequestService';

String.prototype.ucfirst = function()
{
	return this.charAt(0).toUpperCase() + this.substr(1);
}

export default {
  
	/*
	keepOnlyThisChapter: (data) => {
		dispatch({type: ActionTypes.KEEP_AND_CLEAR_CHAPTER, action: data}); 
	},
	*/
	
	getConsumerPlan: (consumer, weeks) => {
		
		for(var i=0; i<weeks.length; i++){
			let promise = RequestService.getConsumerPlan(consumer, weeks[i]);
		
			dispatchAsync(promise, {
			  request: ActionTypes.FETCH_CONSUMER_PLAN,
			  success: ActionTypes.GET_CONSUMER_PLAN,
			  failure: ActionTypes.FETCH_CONSUMER_PLAN_FAILED
			}, { consumer, weeks });
		}
		
	},
	
}