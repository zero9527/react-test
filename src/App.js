import React, { Component } from 'react';
import router from './router';
import Loading from '@/views/loading';
import './App.css';

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
