// 异步请求数据
export function asyncAction({ url = './manifest.json', type }) {
  return dispatch => {
    dispatch({ type: type, data: 'loading' });
    return fetch(url)
      .then(res => res.json())
      .then(json => {
        return dispatch({ type: type, data: json });
      })
      .catch(err => {
        return dispatch({ type: type, data: err });
      });
  };
}
