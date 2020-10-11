import { ADD_NODE } from '../constants/actionTypes';
import { saveTree } from '../utils/storage';

export const addNode = ({ parent }) => ({
	type: ADD_NODE,
	payload: {
		parent
	}
});

export const updateNodes = ({ parent }) => (
	(dispatch, getState) => {
		dispatch(addNode({ parent }));
		console.log(getState());
		saveTree(getState().tree);
	}
)
