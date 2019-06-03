import React from 'react';
import { connect } from 'react-redux';

function Rematch(props) {
  return (
    <div>
      <button onClick={props.Add}>count++</button>
      <div>countRematch: {props.count}</div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    count: state.countRematch.count
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Add: () => dispatch({ type: 'countRematch/increment' })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rematch);
