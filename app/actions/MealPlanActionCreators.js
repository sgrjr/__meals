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
	
	getGroceries: (groceriesURL) => {
		
		let promise = RequestService.getGroceries(groceriesURL);
	
		dispatchAsync(promise, {
		  request: ActionTypes.FETCH_GROCERIES,
		  success: ActionTypes.GET_GROCERIES,
		  failure: ActionTypes.FETCH_GROCERIES_FAILED
		}, { groceriesURL });
		
	},
	getConsumerNotes: (initials) => {
		
		let promise = RequestService.getConsumerNotes(initials);
	
		dispatchAsync(promise, {
		  request: ActionTypes.FETCH_CONSUMER_NOTES,
		  success: ActionTypes.GET_CONSUMER_NOTES,
		  failure: ActionTypes.FETCH_CONSUMER_NOTES_FAILED
		}, { initials });
		
	},
	getRecipes: (url) => {
		
		let promise = RequestService.getRecipes(url);
	
		dispatchAsync(promise, {
		  request: ActionTypes.FETCH_RECIPES,
		  success: ActionTypes.GET_RECIPES,
		  failure: ActionTypes.FETCH_RECIPES_FAILED
		}, { url });
		
	},
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