import React from 'react';
import { Link } from 'react-router';

class MainNav extends React.Component {
	
  render() {
	
    return (
		<div>			
			<Link to='/' >Home </Link> | 
			<Link to='/meals' >Meals </Link> | 
			<Link to='/plans/aw/20160313' >AW: 20160313 Plan </Link> | 
			<Link to='/forms/30-90-medication-review' >30/90 Medication Review Form </Link> | 
		</div>
	);
  }
 
}

module.exports = MainNav;