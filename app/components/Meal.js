import React from 'react';
import Helpers from '../helpers/helpers.js';

class Meal extends React.Component {
  render() {
	 
	const meal = this.props.details;
	const groceries = this.props.store.groceries;

    return (
		<div className='top-of-page'> 
			<h3 id={"meal_"+meal.id}>[{meal.id}] {meal.title}</h3>
			
			 <img style={{maxWidth:"200px"}} src={meal.imageURL} />
			 
			 <h3>Ingredients</h3>
			 
				<ol>
				{meal.ingredients.map(function(ing){
						
					{if(typeof ing === 'string' || ing instanceof String){
						{if(ing != ''){
								return <li key={Math.random()+meal.id}>{ing}</li>;
							}else{
								console.log('Meal.js line#25. string of strings is empty. ' + meal.id);
						}}
					}else{
						
						let i = Helpers.getFromJSON(groceries,ing.id);
						
						{if(!i){
							console.log(i,ing.id,groceries);
						}else{
						
							return (
								<li key={meal.id+ing.id}>
									{ing.count.toFixed(2)} x's { i.unit } | 
									{ i.description }
								</li>
								);
						}}
					}}
				})}		
				</ol>
				
				<h3>Preparation</h3>
				
				 <ol>{meal.preparation.map(function(prep, index){
						 return <li key={Math.random()+index}>{prep}</li>;
					})}</ol>
							 
				<p>{meal.note }</p>
				
		</div>
	);
  }
  
}

module.exports = Meal;