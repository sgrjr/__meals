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
	
	calcaulateGroceryFromPlans(data){

		const recipes = this.props.recipes;
		const groceries = this.props.groceries;
		
		let ingredients = [];

		data.map(function(d){		
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
								//console.log("meal: ",recipe,details,ing);
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
						console.log('ShoppingList.js Line#44: Error on This Recipe Id: ',m);
					}

			});	
		});
		return ingredients;
	}		
		
  render() {

	var shoppingList = this.calcaulateGroceryFromPlans(this.props.data);
	shoppingList.sortOn('category');
	var consumer = this.props.consumer ? this.props.consumer.toUpperCase():"missing";		
	var h2 = '';
	var h2test = '';
	var listStyle = {listStyleType: "none"};
	
	
	shoppingList = [];
	var file = {};
	var list = this.calculateFromFile(file, this.props.groceries);
	var retrievedObject = false;
	//retrievedObject = JSON.parse(localStorage.getItem('ingredients'));
	
	if(retrievedObject){
		console.log(retrievedObject);
		shoppingList = retrievedObject.concat(list);
	}else{
		shoppingList = list;
	}
	
	//localStorage.setItem('ingredients', JSON.stringify(shoppingList));
	
	//shoppingList.filter(function(val) { return val !== null; });
	shoppingList.sortOn('category');
	
    return (
		<div>
			<div className='top-of-page'></div>

			<div className='top-of-page'></div>
			<h1>{consumer}'s Grocery Check-list</h1>
			
			<p><strong>Instructions: </strong> Take inventory of what is at the house already before shopping.</p>
			
			{shoppingList.map(function(item){
				if(item && item.category !== 'g_drink' && item.category !== 'z_prepared'){
					if(item.category !== h2test){
						
						let x = item.category.split('_');
						h2 = x[1];
						h2test = item.category;

						return <div key={Math.random()+item.id}><h2>{h2 ? h2.toUpperCase():"missing"}</h2><h3 style={listStyle}><GroceryItem item={item} /></h3></div>;
					}else{
						return <h3 style={listStyle} key={Math.random()+item.id}><GroceryItem item={item} /></h3>;
					}
				}
				
			})}
		</div>
	);
  }
  
  calculateFromFile(list, groceries){
	  let ingredients = [];
	  
	  list.map(function(ing){
			
			if(ing.id === 151){
				console.log(m);
			}
			
			if(ingredients[ing.id]){
				ingredients[ing.id].count = ingredients[ing.id].count + ing.count;
			}else{
				let details = Helpers.getFromJSON(groceries,ing.id);
				console.log("meal: ",details.id,ing.id);
				
				if(!details){
					console.log('something missing');
				}else{
				
					let count = ing.count;
					ingredients[ing.id] = details;
					ingredients[ing.id].count = count;
				}
			}
		});
		
		return ingredients;
		
  }
  
}

module.exports = ShoppingList;