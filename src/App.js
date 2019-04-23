import React, { Component } from 'react';
import './App.css';
import router from './router';
import Loading from '@/views/loading';

class App extends Component {
  render() {
    // React.Suspense: 路由懒加载
    return (
      <React.Suspense fallback={<Loading />}>
        <router.view />
      </React.Suspense>
    );
  }
}

export default App;
