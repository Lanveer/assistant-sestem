import React from 'react';
import { Layout } from 'antd';
import { Route } from 'dva/router';
import ErrorBoundary from 'components/error-boundary';
import RcBreadcrumb from 'components/rc-breadcrumb';
import FileManage from './file-manage';
import './style.scss';
import PublicButton from 'components/public-button';
const needBackButtonDic = ['approvelCenter', 'newApprovelCenter'];

/*
*判断是否需要返回button
*/
function handleIfNeedBackButton(selectedKeys, pathname) {
  if (needBackButtonDic.includes(selectedKeys)) {
    return pathname.split('/').length > 3;
  }
  return false;
}

function routeBack(history) {
  history.goBack();
}

const { Content } = Layout;
const PageContent = ({ navData, history, match, selectedKeys, userMenu }) => {
  const { location } = history;
  const { path } = match;

  const needBackButton = handleIfNeedBackButton(
    selectedKeys,
    location.pathname
  );

  return (
    <ErrorBoundary>
      <Content className="rc-content-container">
        <RcBreadcrumb
          navData={navData}
          location={location}
          userMenu={userMenu}
        />
        {needBackButton && (
          <PublicButton
            handleClick={() => routeBack(history)}
            text={'返回'}
            type={'primary'}
            customStyle={{ marginBottom: 8 }}
          />
        )}

        {path.search('fileManage') !== -1 && (
          <FileManage pathname={location.pathname} />
        )}

        {navData.map((item, index) => (
          <Route
            exact={item.exact}
            key={`item.path_${index}`}
            path={item.path}
            component={item.component}
          />
        ))}
      </Content>
    </ErrorBoundary>
  );
};

export default PageContent;
