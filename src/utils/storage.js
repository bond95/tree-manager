import { FIRST_NODE } from '../constants/nodes';

export const loadTree = () => {
	if (typeof(Storage) !== 'undefined') {
		return localStorage.tree ? JSON.parse(localStorage.tree) : [FIRST_NODE]
	}
	return [FIRST_NODE];
}

export const saveTree = (tree) => {
	if (typeof(Storage) !== 'undefined') {
		localStorage.setItem('tree', JSON.stringify(tree));
	}
}
