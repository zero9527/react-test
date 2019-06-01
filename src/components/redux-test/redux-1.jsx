import React from 'react';
import { connect } from 'react-redux';

// redux练习
class ReduxTest1 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    console.log('dispatch: ', dispatch);
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

function mapStateToProps(state) {
  return {
    json: state.countReducer.json
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     Add: () => dispatch({ type: 'INCREMENT' }),
//     Todo: todo => dispatch({ type: 'TODO_LIST', todoList: todo })
//   };
// }

// 只注入 dispatch，不监听 store
export default connect(
  mapStateToProps
  // mapDispatchToProps
)(ReduxTest1);
