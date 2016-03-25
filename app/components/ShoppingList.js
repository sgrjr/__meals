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
}
 
class ShoppingList extends React.Component {
		
	calcaulateGroceryFromPlans(plans){
		
		const recipes = this.props.recipes;
		const groceries = this.props.groceries;
		
		let ingredients = [];
		
		plans.map(function(plan){	
			plan.meals.map(function(category){
				category.meals.map(function(m){
					
					let recipe = recipes[m];
					
					recipe.ingredients.map(function(ing){
			
						if(ingredients[ing.id]){
							ingredients[ing.id].count = ingredients[ing.id].count + ing.count;
						}else{
							let details = Helpers.getFromJSON(groceries,ing.id);
							let count = ing.count;
							console.log(ing);
							ingredients[ing.id] = details;
							ingredients[ing.id].count = count;
						}
					});
				});
			});	
		});
		return ingredients;
	}		
		
  render() {

	var shoppingList = this.calcaulateGroceryFromPlans(this.props.plans);
	shoppingList.sortOn('category');
	var consumer = this.props.consumer.toUpperCase();		
	var h2 = '';

    return (
		<div>
			<div className='top-of-page'></div>

			<div className='top-of-page'></div>
			<h1>{consumer}'s Grocery Check-list</h1>
			
			<p><strong>Instructions: </strong> Take inventory of what is at the house already before shopping.</p>
			
			{shoppingList.map(function(item){
				
				if(item.category !== h2){
						h2 = item.category;
						return <div key={item.id}><h2>{item.category.toUpperCase()}</h2><li key={item.id}><GroceryItem item={item} /></li></div>;
					}else{
						return <li key={item.id}><GroceryItem item={item} /></li>;
					}
				
				
			})}
		</div>
	)
  }
}

module.exports = ShoppingList;