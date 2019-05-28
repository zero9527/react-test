import React from 'react';
import { connect } from 'react-redux';

class ReduxTest2 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.count}</div>;
  }
}

function mapState2Props(state) {
  return {
    count: state.count
  };
}

export default connect(mapState2Props)(ReduxTest2);
