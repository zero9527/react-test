import React, { Component } from 'react';
import styles from './t1.less';

class T1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 0,
      oo: {
        num: ''
      }
    };

    this.back = this.back.bind(this);
  }

  componentDidMount = () => {};

  back() {
    this.props.history.push('/');
  }

  add = () => {
    // this.setState({
    //   num: this.state.num + 1
    // });
  };

  numChange = num => {
    // console.log('this.state.num: ', this.state.num);
    console.log('num ', num);
  };

  render() {
    return (
      <div className={styles.t1}>
        <p>T1</p>
        <button onClick={this.back}>Home</button>
        <br />
        <input
          value={this.state.oo.num}
          onChange={() => {}}
          onInput={e => this.numChange(this.state.oo.num)}
        />
        <button>+</button>
      </div>
    );
  }
}

export default T1;
