import React from 'react';

class Note extends React.Component {
  render() {
	 
	Array.prototype.sortOn = function(key){
		this.sort(function(a, b){
			if(a[key] < b[key]){
				return -1;
			}else if(a[key] > b[key]){
				return 1;
			}
			return 0;
		});
	}
	
	const s = '';
	let notes = this.props.notes.notes;
	
	if(!notes){
		notes = [];
	}
	
	const blanks = ['1','2','3','4','5','6','7','8'];
	/*
	notes.sort(function(a, b){
		return a.date-b.date;
	})
	*/
	
	const consumerInitials = (!this.props.consumer) ? "":this.props.consumer.toUpperCase();
	
    return (
		<div>
			<h1>Meal and Excercise Related Feedback for {consumerInitials}</h1>
	
			<p>Please note any (big or small) adjustments, suggestions, ideas relating to the meal and excercise plan. Please note in particular any preferences and interests voiced by the {consumerInitials}</p>
	
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Note</th>
					</tr>
				</thead>
				
				<tbody>
				{notes.map(function(note){
					return (
						<tr key={note.id}>
							<td style={{textAlign:'left'}}>{note.date}</td>
							<td>{note.note}</td>
						</tr>
						);
				})}
				
				{blanks.map(function(b){
					return (
						<tr key={b} style={{height:'60px'}}><td>&nbsp;</td><td>&nbsp;</td></tr>
						);
				})}
				
				</tbody>
			</table>
		</div>
	)
  }
  
}

module.exports = Note;