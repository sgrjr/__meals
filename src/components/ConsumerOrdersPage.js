import React from 'react';
import OrdersStore from '../stores/OrdersStore';
import OrdersActionCreators from '../actions/OrdersActionCreators';
import MainNav from './MainNav';
import OrdersList from './OrdersList';

export default class ConsumerOrdersPage extends React.Component {

	componentWillMount(){
		//OrdersActionCreators.getConsumerOrders(this.props.params.consumer);
		this.state = this._getState();
	}

	_getState() {
		return OrdersStore.getAll();
	}

	_onChange(){		
		let newState = this._getState();
		this.setState(newState);
	}
	
	componentDidMount(){		
		this.changeListener = this._onChange.bind(this);
		OrdersStore.addChangeListener(this.changeListener);
	}
	
	componentWillUnmount(){
		OrdersStore.removeChangeListener(this.changeListener);
	}
	
	componentWillReceiveProps(newProps){
		OrdersActionCreators.getConsumerOrders(this.props.params.consumer);
	}
	
  render() {
	console.log(this.state);
    return (
	<div>
		<MainNav />
		<OrdersList consumer={this.state.consumer}  consumers={this.state.consumers} orders={this.state.orders} doctors={this.state.doctors} />
	</div>
	);
  }
	
}