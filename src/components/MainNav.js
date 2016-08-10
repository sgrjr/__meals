import React from 'react';
import { Link } from 'react-router';

class MainNav extends React.Component {
	
  render() {
	
    return (
		<div id="main-nav">			
			<Link to='/' >Home </Link> | 
			<Link to='/meals' >Meals </Link> | 
			<Link to='/plans/aw/20160522/1' >AW: 20160522 Plan </Link> | 
			<Link to='/plans/bs/20160522/1' >BS: 20160522 Plan </Link> | 
			<Link to='/plans/ct/20160522/1' >CT: 20160522 Plan </Link> | 
			<Link to='/plans/jh/20160522/1' >JH: 20160522 Plan </Link> | 
			<Link to='/plans/down/20160522/1' >DOWN: 20160522 Plan </Link> | 
			<Link to='/forms/30-90-medication-review' >30/90 Medication Review Form </Link> | 
		</div>
	);
  }
 
}

module.exports = MainNav;