import request from 'request';
import bluebird from 'bluebird';
import AppConstants from '../constants/AppConstants';

class RequestService {

	getRecipes() {
		//return this.get("http://localhost/recipes.php");
		//console.log(AppConstants.BASE_URL);
		return this.get(AppConstants.BASE_URL+"recipes.json");
	}
	
	getGroceries() {
		return this.get(AppConstants.BASE_URL+"data/shopping-list.json");
	}
	
	getConsumerNotes(initials) {
		let URL = AppConstants.BASE_URL+"data/"+initials+"/notes.json";
		return this.get(URL);
	}
	
	getConsumerPlan(initials, plan) {
		let URL = AppConstants.BASE_URL+"data/"+initials+"/"+plan+".json";
		return this.get(URL);
	}

///MASTER SEND GET REQUEST:
  get(url){	  
	    return new bluebird( (resolve, reject) => {
		  request.get(
			{
			  url: url,
			  json: true
			},
			(err, response, body) => {
			  if(err){
				return reject(err);
			  }
			  if(body.errors){
				return reject(body.errors);
			  }
			  if(response.statusCode >= 400){
				return reject(body);
			  }
			  return resolve(body);
			}
		  );
		});
	  }  
}

export default new RequestService();