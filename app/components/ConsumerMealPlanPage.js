import React from 'react';
import Note from './Note';
import Week from './Week';
import ShoppingList from './ShoppingList';
import $ from 'jquery';
import Helpers from '../helpers/helpers.js';
import MealPlanStore from '../stores/MealPlanStore';
import MealPlanActionCreators from '../actions/MealPlanActionCreators';
		
export default class ConsumerMealPlan extends React.Component {
 
	componentWillMount(){
		
		MealPlanActionCreators.getGroceries('data/shopping-list.json');
		MealPlanActionCreators.getRecipes('recipes.php');
		
		if(this.props.params.consumer){
			MealPlanActionCreators.getConsumerNotes(this.props.params.consumer);
			MealPlanActionCreators.getConsumerPlan(this.props.params.consumer, this.props.params.plan);
		}else{
			
		}
		
		this.state = this._getState();
	}
	
	componentWillReceiveProps(newProps){
		if(newProps.params.consumer){
			MealPlanActionCreators.getConsumerPlan(this.props.params.consumer, this.props.params.plan);
		}		
	}
	
	_onChange(){		
		let newState = this._getState();
		this.setState(newState);		
	}
	
	componentDidMount(){		
		this.changeListener = this._onChange.bind(this);
		MealPlanStore.addChangeListener(this.changeListener);
	}
	
	componentWillUnmount(){
		MealPlanStore.removeChangeListener(this.changeListener);
	}
	
	_getState() {
		return MealPlanStore.getAll();
	}
	
  render() {
	
	let weeks = this.state.weeks;
	let excerciseId = this.state.excerciseId;
	let daysOfWeek = this.state.daysOfWeek;
	let recipes = this.state.recipes;
	let consumer = this.state.consumer;
	let notes = this.state.notes;
	let groceries = this.state.groceries;
	let weekViewer = '';
	console.log(weeks);
	
	if(weeks && weeks.length >= 1){
		
			weekViewer = weeks.map((week)=>{
				return (<Week 
				recipes={recipes} 
				key={week.dateRange} 
				data={week}
				daysOfWeek={daysOfWeek}
				consumer={consumer}
				/>);
			});
			
			weeks = weekViewer;
	}
	
    return (
	<div>
		<Note consumer={consumer} notes={notes}/>
		
		{weekViewer}
		
		<ShoppingList consumer={consumer} weeks={weeks} recipes={recipes} groceries={groceries}/>
		
	</div>
	);
  }
  
  
app(state) {
		
}

	consumerChangeHandler(event) {
		MealPlanActionCreators.updateConsumer(event.target.value);
	  }
	
}