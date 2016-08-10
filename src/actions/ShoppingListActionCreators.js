'use strict';

import { dispatch } from '../dispatchers/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import Helpers from '../helpers/helpers.js';

Array.prototype.sortOn = function(key){
	this.sort(function(a, b){
		if(a[key] < b[key]){
			return -1;
		}else if(a[key] > b[key]){
			return 1;
		}
		return 0;
	});
};

exports.default = {

	getShopping: function getGroceries(options) {
		var groceries = require('../../static/data/shopping-list.json').data;	
		var recipes = require('../../static/recipes.json').data;
		
		var consumers = options.consumers.split("_");
		var planId = options.plan;
		var weeks = options.weeks.split("_");
		
		var plans = [];
		
		consumers.map(function(consumer){
			var plan = require('../../static/data/'+consumer+'/'+planId+'.json');
			weeks.map(function(week){
				plans.push(plan.weeks[week-1]);
			});
			
			
		});
		

		var list = calcaulateGroceryFromPlans(plans, recipes, groceries);
		list.sortOn('category');
		dispatch(ActionTypes.GET_SHOPPING_LIST, list);
	}

};

function calcaulateGroceryFromPlans(plans, recipes,groceries){

	let ingredients = [];

	plans.map(function(d){		
		d.meals.map(function(category){
			category.meals.map(function(m){

				let recipe = recipes[m];
				if(recipe){
					recipe.ingredients.map(function(ing){
						
						if(ing.id === 151){
							console.log(m);
						}
						
						if(ingredients[ing.id]){
							ingredients[ing.id].count = ingredients[ing.id].count + ing.count;
						}else{
							let details = Helpers.getFromJSON(groceries,ing.id);
		
							if(!details){
								
								let newIndex = Math.floor((Math.random() * 10000) + 1);;
								
								//console.log("meal: ",recipe,details,ing, newIndex);
								ingredients[newIndex] = {
									"id":newIndex,
									"unit":"",
									"description":ing,
									"category":"zz_misssing-info",
									"count":1
									};

							}else{
							
								let count = ing.count;
								ingredients[ing.id] = details;
								ingredients[ing.id].count = count;
							}
						}
					});
				}else{
					console.log('ShoppingList.js Line#44: Error on This Recipe Id: ',m);
				}
			});
		});	

		d.snacks.map(function(s){
				let recipe = recipes[s];
				let timesAWeek = 3;
				if(recipe){
					recipe.ingredients.map(function(ing){

						if(ingredients[ing.id]){
							ingredients[ing.id].count = ingredients[ing.id].count + ing.count*timesAWeek;
						}else{
							let details = Helpers.getFromJSON(groceries,ing.id);
							
							if(!details){
								
								let newIndex = Math.floor((Math.random() * 10000) + 1);;
								
								console.log("meal: ",recipe,details,ing, newIndex);
								ingredients[newIndex] = {
									"id":newIndex,
									"unit":"",
									"description":ing,
									"category":"zz_misssing-info",
									"count":timesAWeek
									};

							}else{
							
								let count = ing.count;
								ingredients[ing.id] = details;
								ingredients[ing.id].count = count*timesAWeek;
							}
						}
								
					});
				}else{
					console.log('ShoppingList.js Line#44: Error on This Recipe Id: ',recipe);
				}

		});	
	});
	
	return ingredients;
		
}