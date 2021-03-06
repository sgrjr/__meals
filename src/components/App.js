import React from 'react';
import MainNav from './MainNav';

require('../stylesheets/app.scss');

class App extends React.Component {

	componentWillMount(){
		console.log('App.js loading...');
	}

  render() {
	
    return (
	<div>
		<MainNav />
		{this.props.children}
	</div>
	);
  }
	
}

module.exports = App;