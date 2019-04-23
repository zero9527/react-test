import React from 'react';
import Router from 'react-concise-router';
import * as PageRoutes from './PageRoutes';
import Home from './views/home';

const routes = [
  {
    path: '/',
    component: Home
  }
];

// 路由懒加载
const lazyLoad = name => React.lazy(() => import(`./views/${name}`));

// 路由批量导入
for (let i in PageRoutes) {
  PageRoutes[i].forEach(item => {
    routes.push({
      name: item.name,
      path: item.path,
      component: lazyLoad(item.componentName)
    });
  });
}
// console.log('routes: ', routes);

const route = new Router({
  mode: 'hash',
  routes
});

export default route;
