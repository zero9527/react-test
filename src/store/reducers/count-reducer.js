import { INCREMENT, TODO_LIST, JSON_DATA } from '../types';

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
