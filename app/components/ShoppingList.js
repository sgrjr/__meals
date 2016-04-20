import React from 'react';
import Helpers from '../helpers/helpers.js';
import GroceryItem from './GroceryItem';

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
 
class ShoppingList extends React.Component {
	
	calcaulateGroceryFromPlans(weeks){
		
		const recipes = this.props.recipes;
		const groceries = this.props.groceries;
		
		let ingredients = [];
		
		weeks.map(function(plan){	
			plan.meals.map(function(category){
				category.meals.map(function(m){
					
					let recipe = recipes[m];
					if(recipe){
						recipe.ingredients.map(function(ing){
				
							if(ingredients[ing.id]){
								ingredients[ing.id].count = ingredients[ing.id].count + ing.count;
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
			
			////////////////
			
			plan.snacks.map(function(s){
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
						console.log('ShoppingList.js Line#44: Error on This Recipe Id: ',m);
					}

			});	
			///////////////
			
		});
		return ingredients;
	}		
		
  render() {

	var shoppingList = this.calcaulateGroceryFromPlans(this.props.weeks);
	shoppingList.sortOn('category');
	var consumer = this.props.consumer.toUpperCase();		
	var h2 = '';
	var h2test = '';
	var listStyle = {listStyleType: "none"};
	
    return (
		<div>
			<div className='top-of-page'></div>

			<div className='top-of-page'></div>
			<h1>{consumer}'s Grocery Check-list</h1>
			
			<p><strong>Instructions: </strong> Take inventory of what is at the house already before shopping.</p>
			
			{shoppingList.map(function(item){
				if(item && item.category !== 'g_drink'){
					if(item.category !== h2test){
						
						let x = item.category.split('_');
						h2 = x[1];
						h2test = item.category;
						return <div key={item.id}><h2>{h2.toUpperCase()}</h2><li style={listStyle}  key={item.id}><GroceryItem item={item} /></li></div>;
					}else{
						return <li style={listStyle} key={item.id}><GroceryItem item={item} /></li>;
					}
				}
				
			})}
		</div>
	);
  }
}

module.exports = ShoppingList;