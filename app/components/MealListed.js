import React from 'react';
import Helpers from '../helpers/helpers.js';

class MealListed extends React.Component {

  render() {
	
	const meal = this.props.meal;
	
    return (
			<td key={meal.id} className='toTop'>
				<span className='progress'> 
					<span><input type='checkbox' name='' value='' />yes</span>
					<span><input type='checkbox' name='' value='' />no</span>
				</span>
			[ { meal.id }  ] {" " + meal.title } 
			</td>
	);
  }
 
}

module.exports = MealListed;