import React from 'react';
import Week from './Week';

class MealPlan extends React.Component {
  render() {
	  
	  const list_weeks = this.props.listWeeks;
	  const consumer = this.props.consumer;
	  const excerciseId = this.props.excerciseId;
	  const daysOfWeek = this.props.daysOfWeek;
	  const recipes = this.props.recipes;
	   
    return (
		<div>
			{list_weeks.map(function(week){
				return <Week recipes={recipes} key={week} week={week} consumer={consumer} excerciseId={excerciseId} daysOfWeek={daysOfWeek} />;
			})}
		</div>
	)
  }
 
}

module.exports = MealPlan;