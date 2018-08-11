import { GITHUB_API , GITHUB_API_MAX_RESULT, LOAD_FAIL } from '../config.js'; 

export const GET_REPO_BY_ID  = 'detailRepo:getRepoById';
export const CLOSE_REPO  	= 'detailRepo:closeRepo';
export const LOADING_REPO  	= 'detailRepo:loadingRepo';

export function getDetailRepo(repo) {

	 return dispatch => {

	 	dispatch(loadingDetailRepo());

	 	if(repo.contributors_list) {
	 		dispatch( { 
				      	type : GET_REPO_BY_ID, 
				      	payload : {
				      		detailRepo : repo
				      	} 
			      	});

	 		return;
	 	}

	 	repo.contributors_list = [];

	 	/* GitHub API has a 100 limit for the contributors endpoint, so we need to do more tha one request to obtain all the contributors... */
	 	let recursiveCall = function(page,repo) {

			fetch(GITHUB_API + "/repos/facebook/" + repo.name + "/contributors?per_page=" + GITHUB_API_MAX_RESULT + "&page=" + page)
			    .then(res => { 

			    	if(!res.ok){

			    		dispatch({ 
							      	type : LOAD_FAIL, 
							      	payload : {
							      		loadError : true
							      	}
							      });

			    		return [];
			    	}
			    		
					return res.json();

				})
			    .then(
			    	data => {

			    		repo.contributors_list = repo.contributors_list.concat(data);
			    		
				      	if(data.length !== GITHUB_API_MAX_RESULT) {
				      		dispatch( { 
						      	type : GET_REPO_BY_ID, 
						      	payload : {
						      		detailRepo : repo
						      	} 
					      	});

					      	return;
				      	}

				      	recursiveCall(page + 1, repo);
				    }
			      //,err => dispatch({ type: 'LOAD_DATA_FAILURE', err })
			    );
		}

		recursiveCall(1, repo);
	}
}

export function closeDetailRepo() {
	return { 
	      		type : CLOSE_REPO, 
	      		payload : {
	      			detailRepo : null
	      	} 
	}
}

function loadingDetailRepo() {
	window.scrollTo(0, 0);
	return { 
	      		type : LOADING_REPO, 
	      		payload : {
	      			detailRepo : LOADING_REPO
	      	} 
	}
}
