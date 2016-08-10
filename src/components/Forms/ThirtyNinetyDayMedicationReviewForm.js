import React from 'react';

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
 
class ThirtyNinetyDayMedicationReviewForm extends React.Component {

	componentWillMount(){}
	_getState() {
		return {
			store:MealPlanStore.getAll()
		};
	}


	

  render() {

	//meals.sortOn('title');

    return (
		<div>
			<div className='top-of-page'></div>
			
			<h1>Meals</h1>
				
			{/*meals.map(function(meal){
				return <Meal key={Math.random()+meal.id} details={meal} store={store} />;
				
			})*/}
			
		</div>
	);
  }
}

module.exports = ThirtyNinetyDayMedicationReviewForm;