///localhost:33/?consumer=bs&weeks=20160207 20160214 20160221 20160228 20160306
//following is dummy data
var consumer = "jh";
var excerciseId = "001";
var list_weeks = ['20160103','20160110','20160117','20160124','20160131'];
var table = '';
var lists = {};
var lists_names = ['breakfasts','lunches','dinners','snacks'];

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

consumer = getQueryVariable('consumer');
//20160207 20160214 20160221 20160228 20160306
list_weeks = getQueryVariable('weeks').split('%20');

function getFromJSON(objectToSearch,valueToFind){	
	var value = jQuery.grep(objectToSearch, function(obj) { 
		return obj.id == valueToFind;
		});
		
	return value[0];
}

function getOnlyThisMealRecipes(recipes){
	
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

$(document).ready(function () {
	
	var recipes = [];
	var groceries = [];
	var notes = [];
	
	var url = 'recipes.php';
	var urlGrocery = 'data/shopping-list.json';
	var urlNotes = 'data/'+consumer+'/notes.json';
	
	$.ajax({
	  url: url,
	  dataType: 'json',
	  cache: false,
	  success: function(data) {
		recipes = data;
		
			$.ajax({
			  url: urlGrocery,
			  dataType: 'json',
			  cache: false,
			  success: function(data) {
				  
				  groceries = data.data;
				  
					$.ajax({
					  url: urlNotes,
					  dataType: 'json',
					  cache: false,
					  success: function(data) {
						notes = data.notes;
						app(recipes, groceries, notes);
					}.bind(this),
					  error: function(xhr, status, err) {
						console.error(url, status, err.toString());
					  }.bind(this)
					});
				
			}.bind(this),
			  error: function(xhr, status, err) {
				console.error(url, status, err.toString());
			  }.bind(this)
			});
		
	}.bind(this),
	  error: function(xhr, status, err) {
		console.error(url, status, err.toString());
	  }.bind(this)
	});
			
});

/////////////////////////////////////
///////////////////////////////start
/////////////////////////////////////

function app(recipes, groceries, notes) { // load json file using jquery ajax
		
		var recipesUsed = [];
		var generatedList = [];
		var ctr1 = 0;
		var txt;
		var mealLists = getOnlyThisMealRecipes(recipes);
	/*
	table += "<h1>Custom Notes and Suggestions for "+consumer.toUpperCase()+"</h1>";
	table += "<ul>";
	notes.reverse().map(function(note){
		table += "<li>"+ note.date +" "+note.note+"</li>";
	});
	table += "</ul>";
	*/
	
	list_weeks.map(function(week){
		
		var data = {};
		var excerciseTips = {};
		var date_id = week;
		var data_file = 'data/'+consumer+'/'+date_id+'.json';
		var excercise_file = 'data/'+consumer+'/et_'+excerciseId+'.json';

		data = JSON.parse($.ajax({type: "GET", url: data_file, async: false}).responseText);

		lists.excerciseTips = JSON.parse($.ajax({type: "GET", url: excercise_file, async: false}).responseText).data;
		
		table = table + "<div class='top-of-page'></div><table><tbody><tr>";
		
		table = table + "<td colspan='2' id='wfsbox'>Woodford's Family Services<br> Residential Program<br><br> <strong>Weekly Menu Plan Sheet</strong></td>";
		table = table + "<td colspan='4'>";
		table = table + "<h1>"+data.initials+"'s Plan</h1>";
		table = table + "<h2>Week of: "+data.dateRange+"</h2>";
		table = table + "</td>";
		table = table + "<td colspan='2' id='weightbox' ><strong>Weekly Weigh-In: </strong><br><br><br><input type='text' /></td>";
		table = table + "</tr></tbody></table>";
		
		table = table + "<table><tbody>";
		table = table + "<tr>"+
			"<th>Day<span></span>Date</th>"+
			"<th>Sunday<span></span>"+data.dates[0]+"</th>"+
			"<th>Monday<span></span>"+data.dates[1]+"</th>"+
			"<th>Tuesday<span></span>"+data.dates[2]+"</th>"+
			"<th>Wednesday<span></span>"+data.dates[3]+"</th>"+
			"<th>Thursday<span></span>"+data.dates[4]+"</th>"+
			"<th>Friday<span></span>"+data.dates[5]+"</th>"+
			"<th>Saturday<span></span>"+data.dates[6]+"</th>";
		table = table + "</tr>";

		data.meals.map(function(m){

			table = table + "<tr><td class='middlized'>"+m.title+"</td>";
			
			m.meals.map(function(bf){
				
				var meal = getFromJSON(recipes,bf);
			
				ctr1 = ctr1 + 1;
				recipesUsed[ctr1] = meal.id;
				
				table = table + 
				"<td class='toTop'><div class='progress'>" +
				"<input type='checkbox' name='' value=''>"+
				"yes</span>" +
				"<input type='checkbox' name='' value=''>"+
				"<span>no</span></div>"+
				"[" + meal.id + "]" +
				meal.title + 
				"</td>";
			});

			table = table + "</tr>";
			
		});
	
		table = table + "<tr><td>Snacks</td><td colspan=8>";
		
		data.snacks.map(function(s){
			ctr1 = ctr1 + 1;
			var snack = getFromJSON(recipes, s);
			recipesUsed[ctr1] = snack.id;
			
			table = table + "<span class='snack-spacer'></span>[#" + snack.id + "]" + snack.title;
		});

		table = table + "</td></tr>";
			
		///Excercise: 
		
		table = table + "<td class='fixedSize'>Excercise (activity + time)</td>" +
		"<td class='fixedSize  toTop'><div class='progress'>" +
			"<input type='checkbox' name='' value=''>"+
			"yes</span>" +
			"<input type='checkbox' name='' value=''>"+
			"<span>no</span></div></td>" + 
		"<td class='fixedSize toTop'><div class='progress'>" +
			"<input type='checkbox' name='' value=''>"+
			"yes</span>" +
			"<input type='checkbox' name='' value=''>"+
			"<span>no</span></div></td>" + 
					"<td class='fixedSize toTop'><div class='progress'>" +
			"<input type='checkbox' name='' value=''>"+
			"yes</span>" +
			"<input type='checkbox' name='' value=''>"+
			"<span>no</span></div></td>" + 
					"<td class='fixedSize toTop'><div class='progress'>" +
			"<input type='checkbox' name='' value=''>"+
			"yes</span>" +
			"<input type='checkbox' name='' value=''>"+
			"<span>no</span></div></td>" + 
					"<td class='fixedSize toTop'><div class='progress'>" +
			"<input type='checkbox' name='' value=''>"+
			"yes</span>" +
			"<input type='checkbox' name='' value=''>"+
			"<span>no</span></div></td>" + 
					"<td class='fixedSize toTop'><div class='progress'>" +
			"<input type='checkbox' name='' value=''>"+
			"yes</span>" +
			"<input type='checkbox' name='' value=''>"+
			"<span>no</span></div></td>" + 
			"<td class='fixedSize toTop'><div class='progress'>" +
			"<input type='checkbox' name='' value=''>"+
			"yes</span>" +
			"<input type='checkbox' name='' value=''>"+
			"<span>no</span></div></td>";
	
		/////end
		table = table + "</tbody></table>";
		/*HERE*/
			//Grocery List Begin
		
			table = table + "<div class='top-of-page'></div><h1>Grocery Check-list</h1><p><strong>Instructions: </strong> Take inventory of what is at the house already before shopping.</p>";
			
			var counters = [];
			generatedList[9999] = '';
			
			recipesUsed.map(function(r){
				
				if(recipes[r]){
					var rec = recipes[r];
					var grocery = [];
					
					rec.ingredients.map(function(i){
						if(i == "" || typeof i === 'undefined'){
							console.log("recipe #" + rec.id + " is blank! Better fix that mistake.");
						}
						
						if(counters[i.id] >= 0){
							counters[i.id] = i.count + counters[i.id];
						}else{
							counters[i.id] = i.count;
						}
						
						if(typeof i === 'string' || i instanceof String){
							generatedList[9999] += i +"<br>";
						}else{
							grocery = getFromJSON(groceries,i.id);
							generatedList[i.id] = grocery;
							generatedList[i.id].counters = counters[i.id];
						}
						
					});
				}else{
					console.log(r + ' does not exist');
				}
			});
			
			generatedList.map(function(l){
						
				if(typeof l === 'string' || l instanceof String){
						if(l != ''){
							table += "<li>";
							table += "<input type='checkbox' name='' value=''>";
							table += l;
							table += "</li>";
						}else{
							console.log('string of strings is empty');
						}
				}else{
					table += "<li>";
					table += "<input type='checkbox' name='' value=''>";					
					table += l.counters.toFixed(2) + " x's " + l.unit + " | " + l.description;
					table += "</li>";
				}
				
			});
			
		generatedList = [];
		recipesUsed = [];//resetting to empty at end of use

	});
	
	//Excercise Ideas List Begin
	table = table + "<div class='top-of-page'></div><h1>Excercise Tips</h1>";
	
	table = table + "<ol>";
	
	lists.excerciseTips.map(function(ex){
		table = table + "<ul>"+ ex +"</ul>";
	});	
	
	table = table + "</ol>";
	
lists_names.map(function(meal){
	
	var rec;
	
	table = table + "<div class='top-of-page'></div><h1>"+meal.charAt(0).toUpperCase()+meal.slice(1)+" List</h1><p><strong style='display:none;'>Notes: </strong></p><p></p>";
	
		mealLists[meal].map(function(b){
			
			if(b.title !== ''){
				table = table + "<p class='showAllDB'><strong>";
				table = table + b.id + " -- ";
				table = table + b.title;
				table = table + "</strong></p>";
				
				if(recipes[b.id]){
					rec = recipes[b.id];
					
					table = table + "<img src='" + rec.imageURL + "' >";
					
					table = table + "<h3>Ingredients</h3>";
					
					table = table + "<ol>";
					
					rec.ingredients.map(function(ing){
						
						if(typeof ing === 'string' || ing instanceof String){
								if(ing != ''){
									table = table + "<li>" + ing + "</li>";
								}else{
									console.log('string of strings is empty line 318');
								}
						}else{
							
							//var groc = 
							table += "<li>";					
							table += ing.count.toFixed(2) + " x's " + ing.id + " | " + ing.id;
							table += "</li>";
						}
						
						
					});
					
					table = table + "</ol>";
					
					table = table + "<h3>Preparation</h3>";
					
					table = table + "<ol>";
					
					rec.preparation.map(function(prep){
						table = table + "<li>" + prep + "</li>";
					});
					
					table = table + "</ol>";
					
					table = table + "<p>" + rec.note + "</p>";
					
				}else{
					table = table + "<p>Recipe with ID: " + b.id + " Does not exist!</p>";
				}
				if(b.tips !== ''){
					table = table + "<p>TIPS: ";
					table = table + b.tips;
					table = table + "</p>";
				}
			}
		});
		/*HERE*/
});

	
	document.getElementById('target').innerHTML = table;
		
		////////////////////////////////////////////////////
		////////////////////////////////////////////////////
}