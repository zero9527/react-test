import { init } from '@rematch/core';
import * as models from './models';

// 需要缓存的列表
const cacheList = ['countRematch'];
const stateCache = sessionStorage.getItem('store-rematch');
// 初始化的 state
const initialState = (stateCache && JSON.parse(stateCache)) || {};

const store = init({
  models: {
    ...models
  },
  redux: {
    initialState: initialState
  }
});

// 监听每次 state 的变化
store.subscribe(() => {
  const state = store.getState();
  let stateData = {};

  Object.keys(state).forEach(item => {
    if (cacheList.includes(item)) stateData[item] = state[item];
  });

  sessionStorage.setItem('store-rematch', JSON.stringify(stateData));
});

console.log('store: ', store);

export default store;
