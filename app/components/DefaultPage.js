import React from 'react';
import { Link } from 'react-router';

class DefaultPage extends React.Component {

	componentWillMount(){
		console.log('DefaultPage.js loading...');
	}

  render() {

	return (
		<ul>			
			<li><Link to='/meals' >Meals</Link></li>
			<li><Link to='/plans/aw/20160313' >AW: 20160313</Link></li>
		</ul>
	);
  }
 
}

module.exports = DefaultPage;