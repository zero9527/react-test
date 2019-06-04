import React, { useEffect } from 'react';
import { connect } from 'react-redux';

function Rematch(props) {
  useEffect(() => {
    props.getData();
  }, []);

  return (
    <div>
      <button onClick={props.Add}>count++</button>
      <div>countRematch: {props.count}</div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    count: state.countRematch.count,
    JSON_DATA: state.countRematch.JSON_DATA
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Add: () => dispatch({ type: 'countRematch/increment' }),
    getData: () => dispatch.countRematch.getJsonData()
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rematch);
