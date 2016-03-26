import React from 'react';
import MealPlanActionCreators from '../actions/MealPlanActionCreators';
import MealPlanStore from '../stores/MealPlanStore';

class Navigation extends React.Component {
  
    constructor(props) {
		super(props);
		this.state = this._getState();		
	  }
 	
	_getState() {		
		return {
			consumer: MealPlanStore.consumer
		};
	}
	
	componentDidMount(){	
		this.changeListener = this._onChange.bind(this);
		MealPlanStore.addChangeListener(this.changeListener);		
	}
	
	_onChange(){		
		let newState = this._getState();
		this.setState(newState);
	}
	
  render() {
    return (	
		<div className="row blueBG" style={{marginBottom:'25p', textAlign:'center'}}>
			<div className="container">
				<div className="col-xs-12">	
					<input term={this.props.search} onChange={this.searchChangeHandler} onSubmit={this.searchSubmitHandler}/>
				</div>
			</div>
		</div>
    );
  }
  
	searchChangeHandler(event) {
		SearchActionCreators.updateSearch(event.target.value);
	  }
	
	searchSubmitHandler(event) {
		event.preventDefault();
		console.log('search submitted...');
		
		MealPlanActionCreators.getConsumerPlan(this.state.search.term);
	}

}

module.exports = Navigation;