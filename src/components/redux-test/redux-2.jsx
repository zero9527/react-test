import React from 'react';
import { connect } from 'react-redux';

class ReduxTest2 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>todo: {this.props.todoList}</div>
        <div>countReducer: {this.props.count}</div>
        <div>numReducer: {this.props.count1}</div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    todoList: state.countReducer.todoList,
    count: state.countReducer.count,
    count1: state.numReducer.count,
    json: state.countReducer.json
  };
}

export default connect(mapStateToProps)(ReduxTest2);
