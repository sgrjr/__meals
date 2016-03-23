import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';
//import books from '../data/BibleBooks';

class MealPlanStore extends BaseStore {
	
	constructor(){
		super();
		this.subscribe(() => this._registerToActions.bind(this));
		
		//this._books = books.list;
		
			this._table = '';
			this._consumer= "AW";
			this._excerciseId = "001";
			this._lists = {};
			this._lists_names =['breakfasts','lunches','dinners','snacks'];
			this._daysOfWeek =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
			this._list_weeks = [];
			this._recipes = [];
			this._groceries = [];
			this._notes = [];
			this._url = 'data/recipes.json';
			this._urlGrocery = 'data/shopping-list.json';
			this._urlNotes = 'data/'+this._consumer+'/notes.json';
		
		this.meta = {
			name : "MealPlanStore"
		};
	
	}
	
	 _registerToActions(payload) {
 
		  switch(paylod.type){			  
			
			case ActionTypes.GET_CONSUMER_PLAN:
				this.logChange(payload);
				this._consumer = payload.action.consumer;
				this._list_weeks = payload.action.weeks;
				this.emitChange();
			  break;
			  
			default:
			  return true;
		  }
	  }
	
	getAll(){
			
		return {
			table:this._table,
			consumer: this._consumer,
			excerciseId : this._excerciseId,
			lists : this._lists,
			lists_names :this._lists_names,
			daysOfWeek :this._daysOfWeek,
			list_weeks : this._list_weeks,
			recipes : this._recipes,
			groceries : this._groceries,
			notes : this._notes,
			url : this._url,
			urlGrocery : this._urlGrocery,
			urlNotes : this._urlNotes
		};
	}
	
//GETTERS:	
	/*
	get books(){
		return this._books;
	}
*/
}

export default new MealPlanStore();