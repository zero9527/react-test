import React, { useReducer, useContext } from 'react';

export function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + 1
      };
    case 'decrement':
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
}

export const UseReducer1Dispatch = React.createContext(null);

// 子组件 通过父组件传递的 dispatch
export function Child1(props) {
  // 这里 UseReducer1Dispatch 是 父组件 cerateContext() 的返回值
  const dispatch = useContext(UseReducer1Dispatch);

  function handleClick() {
    dispatch({ type: 'increment' });
  }

  return (
    <div>
      <button onClick={handleClick}>Child1 count+</button>
    </div>
  );
}

export default function UseReducer1({ initialState = { count: 1 } }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UseReducer1Dispatch.Provider value={dispatch}>
      {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>count+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>count-</button>
      <hr />
      <Child1 dispatch={UseReducer1Dispatch} />
    </UseReducer1Dispatch.Provider>
  );
}
