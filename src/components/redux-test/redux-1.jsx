import React from 'react';
import { connect } from 'react-redux';
import { asyncAction } from '@/store/actions';

// redux练习
class ReduxTest1 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    // 异步 action
    this.props.dispatch(
      asyncAction({
        url: './manifest.json',
        type: 'JSON_DATA'
      })
    );
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <button
            onClick={() => this.props.Todo('干嘛' + new Date().getTime())}
          >
            todo
          </button>
        </div>
        <div>
          <button onClick={this.props.Add}>count++</button>
        </div>
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    Add: () => {
      return dispatch({ type: 'INCREMENT' });
    },
    Todo: todo => dispatch({ type: 'TODO_LIST', todoList: todo })
  };
}

// 只注入 dispatch，不监听 store
export default connect(
  null, // 如果只有 dispatch，而不需要 state，这里必须要一个占位
  mapDispatchToProps
)(ReduxTest1);
