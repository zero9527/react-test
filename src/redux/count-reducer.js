export default function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'ADD_COUNT':
      return {
        ...state,
        count: state.count + 1
      };
    default:
      return state;
  }
}
