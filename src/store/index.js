import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import countReducer from './reducers/count-reducer.js';
import numReducer from './reducers/num-reducer.js';
// import { asyncAction } from '@/store/actions';

// reducers 集中处理
const reducers = combineReducers({
  countReducer,
  numReducer
});

let stateCache = sessionStorage.getItem('store');

// 初始化的 state
const initState = (stateCache && JSON.parse(stateCache)) || {};

// stroe: { subscribe, dispatch, getState, replaceReducer }
const store = createStore(reducers, initState, applyMiddleware(ReduxThunk));

// 监听每次 state 的变化
let unsubscribe = store.subscribe(() => {
  const state = store.getState();
  // console.log('state: ', state);

  sessionStorage.setItem('store', JSON.stringify(state));
});
// 解除监听
// unsubscribe();

// 改变内部 state 惟一方法是 dispatch 一个 action
// 可以直接在这里调用，修改 state
// store.dispatch(
//   asyncAction({
//     url: './manifest.json',
//     type: 'JSON_DATA'
//   })
// );

// 获取初始 state，此时上面的同步的 dispatch 已经更新了 state 了
// const state = store.getState();
// console.log('state: ', state);

export default store;
