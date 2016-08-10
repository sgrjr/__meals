import React from 'react';
import Meal from './Meal';
import MainNav from './MainNav';

// Store
import MealPlanStore from '../stores/MealPlanStore';

//Actions
import MealPlanActionCreators from '../actions/MealPlanActionCreators';

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
 
class MealListPage extends React.Component {

	componentWillMount(){
		
		MealPlanActionCreators.getGroceries('data/shopping-list.json');
		MealPlanActionCreators.getRecipes('recipes.php');
		
		this.state = this._getState();
	}
	
	_getState() {
		return {
			store:MealPlanStore.getAll()
		};
	}

	componentDidMount(){	
		this.changeListener = this._onChange.bind(this);
		MealPlanStore.addChangeListener(this.changeListener);
	}
	
	_onChange(){		
		let newState = this._getState();
		this.setState(newState);		
	}
	
	componentWillUnmount(){
		const store = this.props.route.store;
		store.removeChangeListener(this.changeListener);
	}

  render() {
	const store = this.state.store;
	const meals = store.recipes;
	meals.sortOn('title');

    return (
		<div>
			<MainNav />
			<div className='top-of-page'></div>
			
			<h1>Meals</h1>
				
			{meals.map(function(meal){
				return <Meal key={Math.random()+meal.id} details={meal} store={store} />;
				
			})}
			
		</div>
	);
  }
}

module.exports = MealListPage;