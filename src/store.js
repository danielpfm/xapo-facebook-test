import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import detailRepoReducer from './reducers/detailRepoReducer';
import reposReducer from './reducers/reposReducer';
import errorReducer from './reducers/errorReducer';


const allReducers = combineReducers({
	repos : reposReducer,
	detailRepo :  detailRepoReducer,
	loadError : errorReducer
})

export default createStore(
	allReducers, 
	{
		repos : [],
		detailRepo : null,
		loadError : false
	},
	compose (
    	applyMiddleware(thunk),
    	window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);