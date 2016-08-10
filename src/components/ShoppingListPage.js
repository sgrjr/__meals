import React from 'react';
import ShoppingList from './ShoppingList2';
import ShoppingListStore from '../stores/ShoppingListStore';
import ShoppingListActionCreators from '../actions/ShoppingListActionCreators';
import ShoppingListNavigation from './Forms/ShoppingListNavigation';
	
export default class ShoppingListPlanPage extends React.Component {
 
	componentWillMount(){
		
		ShoppingListActionCreators.default.getShopping({"plan":this.props.params.plan, "weeks":this.props.params.weeks,"consumers":this.props.params.consumers});
		this.state = this._getState();
	}
	
	componentWillReceiveProps(newProps){
		ShoppingListActionCreators.default.getShopping({"plan":this.props.params.plan, "weeks":this.props.params.weeks,"consumers":this.props.params.consumers});		
	}
	
	_onChange(){		
		let newState = this._getState();
		this.setState(newState);		
	}
	
	componentDidMount(){		
		this.changeListener = this._onChange.bind(this);
		ShoppingListStore.addChangeListener(this.changeListener);
	}
	
	componentWillUnmount(){
		ShoppingListStore.removeChangeListener(this.changeListener);
	}
	
	_getState() {
		
		return {
			store: ShoppingListStore.items
			};
	}
	
  render() {

    return (
	<div>	
		<hr />
		<ShoppingListNavigation />
		<hr />
		<ShoppingList list={this.state.store}/>
	</div>
	);
  }
	
}