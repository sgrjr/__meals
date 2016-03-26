import React from 'react';

class GroceryItem extends React.Component {
	
  render() {
	
	const i = this.props.item;
	const count = i.count.toFixed(1).split('.');

    return (
		<div>_______ <span style={{fontSize:'2rem'}}>{count[0]}</span>
				<sup style={{fontSize:'1.4rem'}}>.{count[1]} </sup>
		x's {i.unit} | 
		<strong>{i.description}</strong>
		</div>
	);
  }
 
}

module.exports = GroceryItem;