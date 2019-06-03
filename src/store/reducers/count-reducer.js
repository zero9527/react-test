import { INCREMENT, TODO_LIST, JSON_DATA } from '../types';

// 这里的参数默认值，比createState 的初始 initState 优先级低
function countReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case TODO_LIST:
      return {
        ...state,
        todoList: action.todoList
      };
    case JSON_DATA:
      return {
        ...state,
        json: action.data
      };
    default:
      return state;
  }
}

export default countReducer;
