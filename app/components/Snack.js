import React from 'react';
import Helpers from '../helpers/helpers.js';

class Snack extends React.Component {
	
	componentWillMount(){
		this.state = this._getState();
	}
	
	_getState() {
		return {
			snack: Helpers.getFromJSON(this.props.recipes, this.props.snack)
			};
	}
	
  render() {
	console.log(this.state.snack);
	if(!this.state.snack){
		console.log('wrong');
	}
	
    return (
		<div style={{float:'left'}}>			
			<span className='snack-spacer'></span>{"[#" + this.state.id + "]"} {this.state.title}
		</div>
	)
  }
 
}

module.exports = Snack;