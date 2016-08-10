import React from 'react';
import Note from './Note';
import Week from './Week';
import ShoppingList from './ShoppingList';
import Helpers from '../helpers/helpers.js';
import MealPlanStore from '../stores/MealPlanStore';
import MealPlanActionCreators from '../actions/MealPlanActionCreators';
		
export default class ConsumerMealPlan extends React.Component {
 
	componentWillMount(){
		
		MealPlanActionCreators.getGroceries('data/shopping-list.json');
		MealPlanActionCreators.getRecipes();
		
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
		
		let plan = MealPlanStore.getAll();
		
		return {
			store: plan,
			weeksData: this.filterWeeks(plan.weeks)
			};
	}
	
  render() {
	
	let excerciseId = this.state.store.excerciseId;
	let daysOfWeek = this.state.store.daysOfWeek;
	let recipes = this.state.store.recipes;
	let consumer = this.state.store.consumer;
	let notes = this.state.store.notes;
	let groceries = this.state.store.groceries;
	let weekViewer = '';

	if(this.state.weeksData && this.state.weeksData.length >= 1){
		
			weekViewer = this.state.weeksData.map((week)=>{
				return (<Week 
				recipes={recipes} 
				key={week.dateRange} 
				data={week}
				daysOfWeek={daysOfWeek}
				consumer={consumer}
				/>);
			});

	}

    return (
	<div>
		<Note consumer={consumer} notes={notes}/>
		
		{weekViewer}
		
		<ShoppingList consumer={consumer} data={this.state.weeksData} recipes={recipes} groceries={groceries}/>
		
	</div>
	);
  }
  
	filterWeeks(weeks){
		
		if(this.props.params.week  !== undefined){
			console.log('filtering week',this.props.params.week);
			return [weeks[this.props.params.week-1]];
			
		}else{
			return weeks;
		}

	}
	consumerChangeHandler(event) {
		MealPlanActionCreators.updateConsumer(event.target.value);
	  }
	
}