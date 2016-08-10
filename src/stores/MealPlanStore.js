import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';

class MealPlanStore extends BaseStore {
	
	constructor(){
		super();
		this.subscribe(() => this._registerToActions.bind(this));		
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
		this._plan = false;
		
		this.meta = {
			name : "MealPlanStore"
		};
	
	}
	
	 _registerToActions(payload) {
 
		  switch(payload.type){			  
			
			case ActionTypes.GET_RECIPES:
				this.logChange(payload);
				this._recipes = payload.action.body;
				this.emitChange();
			  break;
			
			case ActionTypes.GET_CONSUMER_PLAN:
				this.logChange(payload);
				this._consumer = payload.action.body.initials;
				this._plan = payload.action.action.plan;
				this._list_weeks = payload.action.body.weeks;
				this.emitChange();
			  break;
			
			case ActionTypes.GET_GROCERIES:
				this.logChange(payload);
				this._groceries = payload.action.body.data;
				this.emitChange();
			  break;
			
			case ActionTypes.GET_CONSUMER_NOTES:
				this.logChange(payload);
				this._notes = payload.action.body;
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
			weeks: this._list_weeks,
			recipes : this._recipes,
			groceries : this._groceries,
			notes : this._notes,
			url : this._url,
			urlGrocery : this._urlGrocery,
			urlNotes : this._urlNotes,
			plan: this._plan
		};
	}
	
//GETTERS:	

	get recipes(){
		return this._recipes;
	}

}

export default new MealPlanStore();