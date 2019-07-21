import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import cloneDeep from 'lodash/cloneDeep';
import { RouterToUrlQuery } from 'react-url-query';
import { getPlainNode } from 'utils/common';
import { setApp } from 'utils/core';
import getNavData from 'app/nav';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
import ErrorPage from 'pages/error';
import ConfigRoute from 'pages/configRoute';
function getRouteData(navData, path) {
  if (
    !navData.some(item => item.layout === path) ||
    !navData.filter(item => item.layout === path)[0].children
  ) {
    return null;
  }
  const route = cloneDeep(navData.filter(item => item.layout === path)[0]);
  const nodeList = getPlainNode(route.children);
  return nodeList;
}

function getLayout(navData, path) {
  if (
    !navData.some(item => item.layout === path) ||
    !navData.filter(item => item.layout === path)[0].children
  ) {
    return null;
  }
  const route = navData.filter(item => item.layout === path)[0];
  return {
    component: route.component,
    layout: route.layout,
    name: route.name,
    path: route.path
  };
}

const initRouteConfig = [
  'user',
  'passwordManage',
  'bookKeeping',
  'bookManage',
  'fileManage',
  'newApprovelCenter',
  'postLoan',
  '403',
  'systemManage'
];

function RouterConfig({ history, app }) {
  const navData = getNavData(app);
  const UserLayout = getLayout(navData, 'user').component;
  const BasicLayout = getLayout(navData, 'basic').component;
  setApp(app);



  const passProps = path => ({
    app,
    getRouteData,
    navData: getRouteData(navData, path)
  });

  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <RouterToUrlQuery>
          <Switch>
            <Route path="/error" render={props => <ErrorPage {...props} />} />
            <Route
              path="/user"
              render={props => <UserLayout {...props} {...passProps('user')} />}
            />
            {initRouteConfig.map(item => {
              return (
                <Route
                  path={`/${item}`}
                  key={item}
                  render={props => (
                    <BasicLayout {...props} {...passProps('basic')} />
                  )}
                />
              );
            })}
            <Route path="/" render={props => <ConfigRoute {...props} />} />
          </Switch>
        </RouterToUrlQuery>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
