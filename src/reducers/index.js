import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import countReducer from './count-reducer.js';
import numReducer from './num-reducer.js';

// reducers 集中处理
const reducers = combineReducers({
  countReducer,
  numReducer
});

// stroe: { subscribe, dispatch, getState, replaceReducer }
const store = createStore(reducers, applyMiddleware(ReduxThunk));

let unsubscribe = store.subscribe(() => {
  const state = store.getState();
  console.log(state);
});
// 解除监听
unsubscribe();

// 改变内部 state 惟一方法是 dispatch 一个 action
// 可以直接在这里调用，修改 state
store.dispatch(asyncAction(fetchData));

// 异步 action 封装，返回原函数，使原函数拥有 dispatch 参数
function asyncAction(fn) {
  return fn;
}

function fetchData(dispatch) {
  return fetch('./manifest.json')
    .then(res => res.json())
    .then(json => {
      return dispatch({ type: 'JSON_DATA', data: json });
    })
    .catch(err => {
      return dispatch({ type: 'JSON_DATA', data: err });
    });
}

// 获取初始 state，此时上面的同步的 dispatch 已经更新了 state 了
const state = store.getState();
console.log('state: ', state);

export default store;
