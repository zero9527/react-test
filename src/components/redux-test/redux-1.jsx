import React from 'react';
import { connect } from 'react-redux';

// redux练习
class ReduxTest1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button onClick={this.props.Add}>count++</button>
      </div>
    );
  }
}

function mapState2Props(state) {
  return {};
}

function mapDispatch2Props(dispatch) {
  return {
    Add: () => dispatch({ type: 'ADD_COUNT' })
  };
}

export default connect(
  mapState2Props,
  mapDispatch2Props
)(ReduxTest1);
