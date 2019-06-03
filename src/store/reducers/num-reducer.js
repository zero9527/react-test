import { INCREMENT } from '../types';

// 这里的参数默认值，比createState 的初始 initState 优先级低
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
