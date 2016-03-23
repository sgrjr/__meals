import React from 'react';
import Helpers from '../helpers/helpers.js';

class MealListed extends React.Component {
  render() {
	var meal = Helpers.getFromJSON(this.props.recipes,this.props.id);

    return (
		<div>
			<td key={meal.id} className='toTop'>
				<div className='progress'> 
					<input type='checkbox' name='' value='' />
					<span>yes</span>
					<input type='checkbox' name='' value='' />
					<span>no</span>
				</div>
			[  { meal.id }  ] 
			{ meal.title } 
			</td>
		</div>
	)
  }
 
}

module.exports = MealListed;