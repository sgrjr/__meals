import $ from 'jquery';

export default {
  
	getQueryVariable: (variable) => {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
	},

	getFromJSON: (objectToSearch,valueToFind) => {
		var value = $.grep(objectToSearch, function(obj) { 
			return obj.id == valueToFind;
			});
			
		return value[0];
	},

	getOnlyThisMealRecipes: (recipes) => {
		
		var meals = {};
		meals.breakfasts = [];
		meals.lunches = [];
		meals.dinners = [];
		meals.snacks = [];
		meals.other = [];
		
		recipes.map(function(r){
			r.tags.map(function(tag){
				
				switch(tag) {
					case "breakfast":
						meals.breakfasts.push(r);
						break;
					case "lunch":
						meals.lunches.push(r);
						break;
					case "dinner":
						meals.dinners.push(r);
						break;
					case "snack":
						meals.snacks.push(r);
						break;
					default:
						meals.other.push(r);
				}
			});	
		});
		
		return meals;	
	}
};