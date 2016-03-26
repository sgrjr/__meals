import React from 'react';
import { Link } from 'react-router';

class MainNav extends React.Component {
	
  render() {
	
    return (
		<div>			
			<Link to='/' >Home</Link>
		</div>
	);
  }
 
}

module.exports = MainNav;