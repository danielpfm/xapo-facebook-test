import { GITHUB_API , GITHUB_API_MAX_RESULT, LOAD_FAIL } from '../config.js'; 

export const GET_REPOS  = 'repos:getRepos';

export function getRepos() {

	return dispatch => {

		/* GitHub API has a 100 limit for the repos endpoint, so we need to do more tha one request to obtain all the repos... */
		let recursiveCall = function(page,repos) {

			fetch(GITHUB_API + "/orgs/facebook/repos?per_page=" + GITHUB_API_MAX_RESULT + "&page=" + page)
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

				}).then(
			    	data => {

			    		repos = repos.concat(data);
			    		
				      	if(data.length !== GITHUB_API_MAX_RESULT) {
				      		dispatch( { 
						      	type : GET_REPOS, 
						      	payload : {
						      		repos : sortReposByWatchers(repos)
						      	} 
					      	});

					      	return;
				      	}

				      	recursiveCall(page + 1, repos);
				    }
			        ,err => { 
			        	dispatch({ 
						      	type : LOAD_FAIL, 
						      	payload : {
						      		loadError : true
						      	}
						      }); 
			        }
			    );
		}

		recursiveCall(1,[]);

	}
}

function sortReposByWatchers(repos) {
	
	return repos.sort((a, b) => { return b.watchers_count - a.watchers_count });
}