import React from 'react';
import Helpers from '../helpers/helpers.js';

class PrescriptionOrder extends React.Component {
	
  render() {
	
	//const snack =;
	const o = this.props.order;
	let doc = {name:""};
	
	if(o.doctor !== ""){
		doc = Helpers.getFromJSON(this.props.doctors, o.doctor);
	}	
	
	let prn = "";
	
	if(o.prn == "true"){
		prn = "PRN: ";
	}
	
    return (
		<tr>		
			<td>{o.consumer}</td>
			<td>{o.drug}</td>
			<td>{o.dose} / {o.route}</td>
			<td>{prn} {o.time}</td>
			<td>{o.writtendate}</td>
			<td>{doc.name} #{doc.phone}</td>
		</tr>
	);
  }
 
}

module.exports = PrescriptionOrder;