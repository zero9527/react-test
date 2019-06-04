/**
 * =================
 * useReducer 数据持久化
 * =================
 */

// 默认的storeKey
const defaultStorageKey = 'store-useReducer';

cacheConfig({
  storageType: 'sessionStorage'
  // storeKey: defaultStorageKey
});

// 配置
export function cacheConfig({
  storageType = 'sessionStorage',
  storeKey = defaultStorageKey
}) {
  const config = {
    storeKey, // 存储使用的字段 key
    storageType: storageType // 使用 sessionStorage/localStorage
  };
  sessionStorage.setItem('cacheConfig', JSON.stringify(config));
}

// 获取 storeKey
export function getStoreKey() {
  const config = sessionStorage.getItem('cacheConfig');
  const storeKey =
    (config && JSON.parse(config) && JSON.parse(config).storeKey) ||
    defaultStorageKey;

  return storeKey;
}

/**
 * 设置 本地缓存并 原样返回 newState
 * @param {state对象的属性字段名} storageName
 * @param {本地存储的 key} storeKey
 * @param {新的 state } newState
 */
export function setCache({ storageName, storeKey, newState }) {
  let config = sessionStorage.getItem('cacheConfig');
  const { storeKey: _storeKey, storageType } = (config &&
    JSON.parse(config)) || {
    storeKey: storeKey,
    storageType: 'sessionStorage'
  };

  if (!storeKey && !_storeKey) {
    console.warn('storeKey为空！');
    return newState;
  }
  let oldState = window[storageType].getItem(storeKey || _storeKey);
  // debugger;
  window[storageType].setItem(
    storeKey || _storeKey,
    oldState
      ? JSON.stringify({
          ...JSON.parse(oldState),
          [storageName]: newState
        })
      : JSON.stringify({
          [storageName]: newState
        })
  );
  subscribe(cache => {
    debugger;
  });
  return newState;
}

// 缓存变化 每次都会调用
export function subscribe(fn) {
  if (fn) return;
  fn.apply(null, getCache(), ...arguments);
}

/**
 * 返回的获取本地存储的数据
 */
export function getCache(storageName = null) {
  const storeKey = getStoreKey();
  if (!storeKey) {
    console.warn('storeKey为空！');
    return;
  }
  const storage = sessionStorage.getItem(storeKey);
  if (storage && JSON.parse(storage)) {
    let stateOfName = JSON.parse(storage)[storageName];

    if (storageName && stateOfName) {
      return stateOfName;
    } else {
      return JSON.parse(storage);
    }
  }
}
