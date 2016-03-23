import React from 'react';
import $ from 'jquery';
import Helpers from '../helpers/helpers.js';
import Snack from './Snack';
import MealListed from './MealListed';

class Week extends React.Component {
	
	componentWillMount(){
		
		let date_id = this.props.week;
		let data_file = 'data/'+this.props.consumer+'/'+date_id+'.json';
		let excercise_file = 'data/'+this.props.consumer+'/et_'+this.props.excerciseId+'.json';
		
		this.state = {
			excerciseTips : {},
			date_id : date_id,
			data_file : data_file,
			excercise_file : excercise_file,
			data : JSON.parse($.ajax({type: "GET", url: data_file, async: false}).responseText),
			lists : {
				excerciseTips : JSON.parse($.ajax({type: "GET", url: excercise_file, async: false}).responseText).data
				}
		};
	}
	
  render() {
	  
	var date_id = this.state.week;
	var data_file = this.state.data_file;
	var excercise_file = this.state.excercise_file;
	var data = this.state.data;
	var lists = this.state.lists;
	var daysOfWeek = this.props.daysOfWeek;
	var day = 0;
	var recipes = this.props.recipes;
	
    return (
		<div>
			<div className='top-of-page'></div>
			
			<table>
				<tbody>
					<tr>
						<td colSpan='2' id='wfsbox'>Woodford's Family Services<br /> Residential Program<br /><br /> <strong>Weekly Menu Plan Sheet</strong></td>
						<td colSpan='4'>
						
						<h1>data.initials's Plan</h1>
						<h2>Week of: {data.dateRange}</h2>
						
						</td>
						<td colSpan='2' id='weightbox' ><strong>Weekly Weigh-In: </strong><br /><br /><br /><input type='text' /></td>
					</tr>
				</tbody>
			</table>
			
			<table>
				<tbody>
					<tr>
						<th>Day<span></span>Date</th>
			
						{data.dates.map(function(d){
							return <th key={d}>{daysOfWeek[day]}<span></span>{d}</th>;
							day++;
						})}
					</tr>

			{data.meals.map(function(m){
				
				<tr key={m.title}>
					<td className='middlized'>m.title</td>
				
					{m.meals.map(function(bf){
						return <MealListed key={bf} id={bf} recipes={recipes} />;
					})}

			</tr>
			})}
	
		<tr>
			<td>Snacks</td>
			<td colSpan='8'>
				{data.snacks.map(function(s){
					return <Snack key={s} snack={s} recipes={recipes}/>;
				})}
			</td>
		</tr>
		<tr>		
			<td className='fixedSize'>Excercise (activity  time)
			</td> 
			<td className='fixedSize  toTop'><div className='progress'> 
				<input type='checkbox' name='' value='' />
				<span>yes</span> 
				<input type='checkbox' name='' value='' />
				<span>no</span></div>
			</td>  
			<td className='fixedSize toTop'><div className='progress'> 
				<input type='checkbox' name='' value='' />
				<span>yes</span> 
				<input type='checkbox' name='' value='' />
				<span>no</span></div>
			</td>  
			<td className='fixedSize toTop'><div className='progress'> 
				<input type='checkbox' name='' value='' />
				<span>yes</span> 
				<input type='checkbox' name='' value='' />
				<span>no</span></div>
			</td>  
			<td className='fixedSize toTop'><div className='progress'> 
				<input type='checkbox' name='' value='' />
				<span>yes</span> 
				<input type='checkbox' name='' value='' />
				<span>no</span></div>
			</td>  
			<td className='fixedSize toTop'><div className='progress'> 
				<input type='checkbox' name='' value='' />
				<span>yes</span> 
				<input type='checkbox' name='' value='' />
				<span>no</span></div>
			</td>  
			<td className='fixedSize toTop'><div className='progress'> 
				<input type='checkbox' name='' value='' />
				<span>yes</span> 
				<input type='checkbox' name='' value='' />
				<span>no</span></div></td>  
				<td className='fixedSize toTop'><div className='progress'> 
				<input type='checkbox' name='' value='' />
				<span>yes</span> 
				<input type='checkbox' name='' value='' />
				<span>no</span></div>
			</td>
			</tr>
		</tbody>
	</table>
</div>
	)
  }
 
}

module.exports = Week;