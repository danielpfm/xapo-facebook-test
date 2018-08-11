import { GET_REPOS } from '../actions/reposActions';
import { LOAD_FAIL } from '../config';

export default function reposReducer (state = [], action) {

	switch (action.type) {

		case GET_REPOS:
			return action.payload.repos;

		case LOAD_FAIL:
			return [];

		default :
			return state;
	}
}