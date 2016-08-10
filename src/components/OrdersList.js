import React from 'react';
import Helpers from '../helpers/helpers.js';
import GroceryItem from './GroceryItem';
import PrescriptionOrder from './PrescriptionOrder';

Array.prototype.sortOn = function(key){
	this.sort(function(a, b){
		if(a[key] < b[key]){
			return -1;
		}else if(a[key] > b[key]){
			return 1;
		}
		return 0;
	});
};
 
class OrdersList extends React.Component {
				
  render() {
	let orders = this.props.orders;
	orders.sortOn('consumer');
	let doctors = this.props.doctors;
	var listStyle = {listStyleType: "none"};
	
    return (
		<div>
			<div className='top-of-page'></div>

			<div className='top-of-page'></div>
			<h1>House Prescription Orders</h1>
		
			<table>
				<thead>
					<tr>	
						<th>Consumer</th>
						<th>Drug</th>
						<th>Dose / Route</th>
						<th>Time</th>
						<th>Written Date</th>
						<th>Doctor</th>
					</tr>
				</thead>
				<tbody>
				{orders.map(function(order){
					return <PrescriptionOrder key={order.id} order={order} doctors={doctors}/>;
				})}
				</tbody>
			</table>
			
		</div>
	);
  }
}

module.exports = OrdersList;