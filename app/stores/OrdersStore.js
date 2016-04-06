import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';

import doctors from '../../build/data/doctors.json';
import consumers from '../../build/data/consumers.json';
import orders from '../../build/data/orders.json';

class OrdersStore extends BaseStore {

	constructor(){
		super();
		this.subscribe(() => this._registerToActions.bind(this));
		this._consumers = consumers.data;
		this._consumer = "aw";
		this._doctors= doctors.data;	
		this._orders = orders.data;

		this.meta = {
			name : "OrdersStore"
		}; 
	}
	
	 _registerToActions(payload) {
 
		  switch(payload.type){			  
			
			case ActionTypes.GET_CONSUMER_ORDERS:
				this.logChange(payload);
				this._orders = payload.action.body;
				this.emitChange();
			  break;
			  
			default:
			  return true;
		  }
	  }
	
	getAll(){
			
		return {
			consumers:this._consumers,
			consumer: this._consumer,
			doctors: this._doctors,
			orders: this._orders
		};
	}
	
}

export default new OrdersStore();