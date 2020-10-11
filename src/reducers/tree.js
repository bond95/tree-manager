/* eslint-disable default-case */
import produce from 'immer';

import { ADD_NODE } from '../constants/actionTypes';
import { loadTree } from '../utils/storage';

export default (state = loadTree(), action) =>
  produce(state, draft => {
    switch (action.type) {
	    case ADD_NODE:
	      const { parent } = action.payload;
	      const id = state.reduce((a, node) => Math.max(node.id, a), 0) + 1;
	      draft.push({ parent, id });
	      break;
	    }
  });
