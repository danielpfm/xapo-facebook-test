import { GET_REPO_BY_ID, CLOSE_REPO, LOADING_REPO } from '../actions/detailRepoActions';
import { LOAD_FAIL } from '../config';

export default function detailRepoReducer (state = '', action) {
	switch (action.type) {

		case GET_REPO_BY_ID:
			return action.payload.detailRepo;

		case LOADING_REPO:
			return action.payload.detailRepo;

		case CLOSE_REPO:
			return null;

		case LOAD_FAIL:
			return null;

		default :
			return state;
	}
}