import { INCREMENT } from '../types';

function numReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 2
      };
    default:
      return state;
  }
}

export default numReducer;
