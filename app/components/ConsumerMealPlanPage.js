import React from 'react';
import Note from './Note';
import Week from './Week';
import ShoppingList from './ShoppingList';
import $ from 'jquery';
import Helpers from '../helpers/helpers.js';
import MealPlanStore from '../stores/MealPlanStore';
import MealPlanActionCreators from '../actions/MealPlanActionCreators';
import MainNav from './MainNav';
		
export default class ConsumerMealPlan extends React.Component {
 
	componentWillMount(){
		
		MealPlanActionCreators.getGroceries('data/shopping-list.json');
		MealPlanActionCreators.getRecipes('recipes.php');
		
		if(this.props.params.consumer){
			MealPlanActionCreators.getConsumerNotes(this.props.params.consumer);
			MealPlanActionCreators.getConsumerPlan(this.props.params.consumer, this.props.params.weeks.split('-'));
		}else{
			
		}
		
		this.state = this._getState();
	}
	
	componentWillReceiveProps(newProps){
		
		if(newProps.params.consumer){
			MealPlanActionCreators.getConsumerPlan(this.props.params.consumer, this.props.params.weeks.split('-'));
		}else{
			MealPlanActionCreators.getChapterByReference(newProps.params.book, newProps.params.chapter);
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
	
	const list_weeks = this.state.listWeeks;
	const excerciseId = this.state.excerciseId;
	const daysOfWeek = this.state.daysOfWeek;
	const recipes = this.state.recipes;
	
    return (
	<div>
		<MainNav />
		<Note consumer={this.state.consumer} notes={this.state.notes}/>
		
		{this.state.plans.map(function(p){
	
			const consumer = p.initials;

			return (<Week 
				recipes={recipes} 
				key={p.dateRange} 
				data={p}
				daysOfWeek={daysOfWeek} 
				/>);
		})}
		
		<ShoppingList consumer={this.state.consumer} plans={this.state.plans} recipes={this.state.recipes} groceries={this.state.groceries}/>
		
	</div>
	);
  }
  
  
app(state) {
		
/*			
	
	//Excercise Ideas List Begin
	table = table + "<div class='top-of-page'></div><h1>Excercise Tips</h1>";
	
	table = table + "<ol>";
	
	lists.excerciseTips.map(function(ex){
		table = table + "<ul>"+ ex +"</ul>";
	});	
	
	table = table + "</ol>";
	*/
	}

	consumerChangeHandler(event) {
		MealPlanActionCreators.updateConsumer(event.target.value);
	  }
	
}