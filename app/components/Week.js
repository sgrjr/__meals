import React from 'react';
import $ from 'jquery';
import Helpers from '../helpers/helpers.js';
import Snack from './Snack';
import MealListed from './MealListed';

class Week extends React.Component {
	
	componentWillMount(){
		this.state = this._getState();
	}
	
	_getState() {
		return {
			day:0
		};
	}
	
  render() {

	var data = this.props.data;
	var daysOfWeek = this.props.daysOfWeek;	
	var recipes = this.props.recipes;			
	let day = this.state.day;
	
    return (
		<div className='top-of-page'>			
			<table>
				<tbody>
					<tr>
						<td colSpan='2' id='wfsbox'>Woodford's Family Services<br /> Residential Program<br /><br /> <strong>Weekly Menu Plan Sheet</strong></td>
						<td colSpan='4'>
						
						<h1>{data.initials}'s Plan</h1>
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
			
						{data.dates.map(function(d,index){
							return <th key={d}>{daysOfWeek[index]}<span></span>{d}</th>;
						})}
					</tr>

			{data.meals.map(function(m){
				
				return (<tr key={m.title}>
					<td className='middlized'>{m.title}</td>
					{m.meals.map(function(mealId){
						
						let meal = Helpers.getFromJSON(recipes,mealId);
						
						if(meal){
							 return <MealListed key={Math.random()} meal={meal} />;
						}else{	
							console.log(meal,mealId,recipes);
						}
					})}
			</tr>);
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
	);
  }
 
}

module.exports = Week;