let models = {
  state: {
    count: 0,
    data: [],
    todoList: '',
    JSON_DATA: ''
  },
  reducers: {
    increment(state) {
      return {
        ...state,
        count: state.count + 1
      };
    },
    SetData(state, val) {
      return {
        ...state,
        data: val
      };
    }
  },
  effects: {
    async getData() {
      let d = [1];
      await setTimeout(() => d.push(2));
      fetch('./menifest.json')
        .then(res => res.json())
        .then(json => {
          return dispatch({ type: type, data: json });
        })
        .catch(err => {
          return dispatch({ type: type, data: err });
        });
      this.SetData(d);
    }
  }
};

export default models;
