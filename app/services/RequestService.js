import request from 'request';
import bluebird from 'bluebird';
import AppConstants from '../constants/AppConstants';

class RequestService {

	getRecipes(recipesURL) {
		return this.get(AppConstants.BASE_URL+recipesURL);
	}
	
	getGroceries(groceriesURL) {
		return this.get(AppConstants.BASE_URL+groceriesURL);
	}
	
	getConsumerNotes(initials) {
		let URL = AppConstants.BASE_URL+"/data/"+initials+"/notes.json";
		return this.get(URL);
	}
	
	getConsumerPlan(initials, week) {
		let URL = AppConstants.BASE_URL+"/data/"+initials+"/"+week+".json";
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