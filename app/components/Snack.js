import React from 'react';
import Helpers from '../helpers/helpers.js';

class Snack extends React.Component {
	
  render() {
	
	const snack = Helpers.getFromJSON(this.props.recipes, this.props.snack);
	
    return (
		<div style={{float:'left'}}>			
			<span className='snack-spacer'></span>{"[#" + snack.id + "]"} {snack.title}
		</div>
	);
  }
 
}

module.exports = Snack;