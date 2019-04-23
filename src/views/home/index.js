import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import styles from './home.less';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles['Home']}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Link to="/t1" className="App-link">
            <div>t1</div>
          </Link>
          <Link to="/mdEditor" className="App-link">
            <div>mdEditor</div>
          </Link>
          <Link to="/noteDetail" className="App-link">
            <div>noteDetail</div>
          </Link>
        </header>
      </div>
    );
  }
}

export default Home;
