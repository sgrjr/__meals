import React from 'react';

class ShoppingListNavigation extends React.Component {

  render() {
	
	let plans = [
			{ year:2016, month: 3, start: 13},	
			{ year:2016, month: 4, start: 17},	
			{ year:2016, month: 5, start: 22},	
			{ year:2016, month: 6, start: 26}
		];
	
	let consumers = ["BS","CT","JH"];
	
    return (
		<div>
		
		
			<form action="#" method="get">
			
				{consumers.map(function(consumer){
					return <input type="checkbox" name="consumer" value="{consumer}" />;
				})}
			
			  
			  <input type="checkbox" name="vehicle" value="Car" checked="checked" />
			  
			  <input type="submit" value="Submit" />
			</form>
			
			<a href="">{this.state.link}</a>
			
		</div>
	);
  }
}

module.exports = ShoppingListNavigation;