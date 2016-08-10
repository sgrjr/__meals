import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';

class ShoppingListStore extends BaseStore {
	
	constructor(){
		super();
		this.subscribe(() => this._registerToActions.bind(this));
		this._items = [];
		
		this.meta = {
			name : "MealPlanStore"
		};
	
	}
	
	 _registerToActions(payload) {
 
		  switch(payload.type){			  
			
			case ActionTypes.GET_SHOPPING_LIST:
				this.logChange(payload);
				this._items = payload.action;
				this.emitChange();
			  break;
			  
			default:
			  return true;
		  }
	  }
	
	getAll(){
			
		return {
			items:this._items,
		};
	}
	
//GETTERS:	

	get items(){
		return this._items;
	}

}

export default new ShoppingListStore();