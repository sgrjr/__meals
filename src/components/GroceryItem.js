import React from 'react';

class GroceryItem extends React.Component {
	
  render() {
	
	const i = this.props.item;
	const count = i.count.toFixed(1).split('.');

    return (
		<div>____ <span style={{fontSize:'2rem'}}>{count[0]}</span>
				<sup style={{fontSize:'1.4rem'}}>.{count[1]} </sup> {i.unit} | 
		<strong>{i.description}</strong>
		
			<div>
			{/*i.nutrition.map(function(n){
				let a = n.amount*i.count;
				return <span>| {n.id} {a} g</span>;
			})*/}
			</div>
		
		</div>
	);
  }
 
}

module.exports = GroceryItem;