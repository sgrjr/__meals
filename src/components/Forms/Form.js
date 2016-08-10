import React from 'react';
import OrdersStore from '../../stores/OrdersStore';
import OrdersActionCreators from '../../actions/OrdersActionCreators';

class MealListPage extends React.Component {

	componentWillMount(){
		this.state = this._getState();
	}

	_getState() {
		return {
			store:OrdersStore.getAll()
		}
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
	
  render() {

    return (
		<div>
			<div className='top-of-page'></div>
			
			{this.getForm(this.props.params.form, this.state.store)}
			
		</div>
	);
  }
  
  getForm(formName, data){
	  		
	switch(formName) {
		case '30-90-medication-review':
			return <ThirtyNinetyDayMedicationReviewForm  data={data} handleConsumerChange={this.handleConsumerChange.bind(this)}/>
			break;

		default:
			return false;
	}
	
  }
  
  handleConsumerChange(consumer){
	  OrdersActionCreators.getConsumerOrders(consumer);
  }
  
}

module.exports = MealListPage;