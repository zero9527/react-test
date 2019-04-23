import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Home">
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
          <Link to="/test">
            <div>test</div>
          </Link>
          <Link to="/t1">
            <div>t1</div>
          </Link>
          <Link to="/noteDetail">
            <div>noteDetail</div>
          </Link>
        </header>
      </div>
    );
  }
}

export default Home;
