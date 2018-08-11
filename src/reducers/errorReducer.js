import { LOAD_FAIL } from '../config.js';

export default function errorReducer (state = [], action) {
	
	switch (action.type) {

		case LOAD_FAIL:
			return true

		default :
			return state;
	}
}