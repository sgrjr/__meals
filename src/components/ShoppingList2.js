import React from 'react';
import Helpers from '../helpers/helpers.js';
import GroceryItem from './GroceryItem';

class ShoppingList extends React.Component {
		
  render() {
		
	var h2 = '';
	var h2test = '';
	var listStyle = {listStyleType: "none"};
	
    return (
		<div>
			<div className='top-of-page'></div>

			<div className='top-of-page'></div>
			<h1>Grocery Check-list</h1>
			
			<p><strong>Instructions: </strong> Take inventory of what is at the house already before shopping.</p>
			
			{this.props.list.map(function(item){
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
  
}

module.exports = ShoppingList;