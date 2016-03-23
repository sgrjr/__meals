import React from 'react';
import Note from './Note';
import MealPlan from './MealPlan';
import $ from 'jquery';
import Helpers from '../helpers/helpers.js';
import MealPlanStore from '../stores/MealPlanStore';
import MealPlanActionCreators from '../actions/MealPlanActionCreators';

Array.prototype.sortOn = function(key){
    this.sort(function(a, b){
        if(a[key] < b[key]){
            return -1;
        }else if(a[key] > b[key]){
            return 1;
        }
        return 0;
    });
}

export default class App extends React.Component {
	
	componentWillMount(){
		
		if(this.props.params.consumer){
			MealPlanActionCreators.getConsumerPlan(this.props.params.consumer, this.props.params.weeks.split('%20'));
		}else{
			MealPlanActionCreators.emptyVerse();
			MealPlanActionCreators.getChapterByReference(this.props.params.book, this.props.params.chapter);
		}
		
		this.state = this._getState();
	}
	
	componentWillReceiveProps(newProps){
		
		if(newProps.params.consumer){
			MealPlanActionCreators.getConsumerPlan(this.props.params.consumer, this.props.params.weeks.split('%20'));
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
		
		//let consumerInitials = Helpers.getQueryVariable('consumer');
		//let list_weeks = Helpers.getQueryVariable('weeks').split('%20');
		return MealPlanStore.getAll();
	}
	
  render() {
    return (
	<div>
		<Note consumer={this.state.consumer} notes={this.state.notes}/>
		<MealPlan recipes={this.state.recipes} daysOfWeek={this.state.daysOfWeek} listWeeks={this.state.list_weeks} consumer={this.state.consumer} excerciseId={this.state.excerciseId} />
		{this.state.table}
	</div>
	);
  }
  
  
app(state) {
		
		var table = '';
		var recipes = state.recipes;
		var consumer = state.consumer;
		var excerciseId = state.excerciseId;
		var lists = state.lists;
		var lists_names = state.lists_names;
		var daysOfWeek = state.daysOfWeek;
		var lists_names = state.lists_names;
		var daysOfWeek = state.daysOfWeek;
		var list_weeks = state.list_weeks;
		var recipes = state.recipes;
		var groceries = state.groceries;
		var notes= state.notes;
		var url= state.url;
		var urlGrocery = state.urlGrocery;
		var urlNotes = state.urlNotes;		
		
		var recipesUsed = [];
		var generatedList = [];
		var ctr1 = 0;
		var txt;
		var mealLists = Helpers.getOnlyThisMealRecipes(recipes);
	
/*			//Grocery List Begin
		
			table = table + "<div class='top-of-page'></div><h1>"+consumer.toUpperCase()+"'s Grocery Check-list</h1><p><strong>Instructions: </strong> Take inventory of what is at the house already before shopping.</p>";
			
			var counters = [];
			generatedList[9999] = '';
			
			recipesUsed.map(function(r){
				
				if(recipes[r]){
					var rec = recipes[r];
					var grocery = [];
					
					rec.ingredients.map(function(i){
						if(i == "" || typeof i === 'undefined'){
							console.log("recipe #" + rec.id + " is blank! Better fix that mistake.");
						}
						
						if(counters[i.id] >= 0){
							counters[i.id] = i.count + counters[i.id];
						}else{
							counters[i.id] = i.count;
						}
						
						if(typeof i === 'string' || i instanceof String){
							generatedList[9999] += "recipe#" + r + " --" + i +"<br>";
						}else{
							grocery = Helpers.getFromJSON(groceries,i.id);
							generatedList[i.id] = grocery;
							generatedList[i.id].counters = counters[i.id];
						}
						
					});
				}else{
					console.log(r + ' does not exist');
				}
			});
			
			generatedList.sortOn("category");
			var h2 = '';
			
			generatedList.map(function(l){
				
				if(l.category !== undefined && h2 !== l.category){
					table += "<h3>"+ l.category.toUpperCase().replace(/[A-Z]_([a-zA-Z]*)/g, "$1")+"</h3>";
					h2 = l.category;
				}
				
				if(typeof l === 'string' || l instanceof String){
						if(l != ''){
							table += "<li>";
							table += "<input type='checkbox' name='' value=''>";
							table += l;
							table += "</li>";
						}else{
							console.log('string of strings is empty');
						}
				}else{
					table += "<li>";
					table += "<input type='checkbox' name='' value=''>___________";					
					table += l.counters.toFixed(1) + " x's (UNIT) " + l.unit + " | <strong>" + l.description + "</strong>";
					table += "</li>";
				}
				
			});
			
		generatedList = [];
		recipesUsed = [];//resetting to empty at end of use

	});
	
	//Excercise Ideas List Begin
	table = table + "<div class='top-of-page'></div><h1>Excercise Tips</h1>";
	
	table = table + "<ol>";
	
	lists.excerciseTips.map(function(ex){
		table = table + "<ul>"+ ex +"</ul>";
	});	
	
	table = table + "</ol>";
	
lists_names.map(function(meal){
	
	var rec;
	
	table = table + "<div class='top-of-page'></div><h1>"+meal.charAt(0).toUpperCase()+meal.slice(1)+" List</h1><p><strong style='display:none;'>Notes: </strong></p><p></p>";
	
		mealLists[meal].map(function(b){
			
			if(b.title !== ''){
				table = table + "<p class='showAllDB'><strong>";
				table = table + b.id + " -- ";
				table = table + b.title;
				table = table + "</strong></p>";
				
				if(recipes[b.id]){
					rec = recipes[b.id];
					
					table = table + "<img src='" + rec.imageURL + "' >";
					
					table = table + "<h3>Ingredients</h3>";
					
					table = table + "<ol>";
					
					rec.ingredients.map(function(ing){
						
						if(typeof ing === 'string' || ing instanceof String){
								if(ing != ''){
									table = table + "<li>" + ing + "</li>";
								}else{
									console.log('string of strings is empty line 377');
								}
						}else{
							
							//var groc = 
							table += "<li>";					
							table += ing.count.toFixed(2) + " x's " + ing.id + " | " + ing.id;
							table += "</li>";
						}
						
						
					});
					
					table = table + "</ol>";
					
					table = table + "<h3>Preparation</h3>";
					
					table = table + "<ol>";
					
					rec.preparation.map(function(prep){
						table = table + "<li>" + prep + "</li>";
					});
					
					table = table + "</ol>";
					
					table = table + "<p>" + rec.note + "</p>";
					
				}else{
					table = table + "<p>Recipe with ID: " + b.id + " Does not exist!</p>";
				}
				if(b.tips !== ''){
					table = table + "<p>TIPS: ";
					table = table + b.tips;
					table = table + "</p>";
				}
			}
		});
	});	
	
	return table;
	*/
	}

	consumerChangeHandler(event) {
		MealPlanActionCreators.updateConsumer(event.target.value);
	  }
	
}