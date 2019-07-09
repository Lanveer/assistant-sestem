import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { Breadcrumb } from 'antd';
import lodash from 'lodash';

let MENU_ROUTE_DIC = {};

import './style.scss';
export default class RcBreadcrumb extends PureComponent {
  static propTypes = {
    navData: PropTypes.array,
    location: PropTypes.object
  };

  constructor(props) {
    super(props);
  }


  componentDidMount() {}

  /*
  *将路由转化为dict{path:name}
  */
  constructBreadcrumbDic = navData => {
    let result = {};
    for (let navItem of navData) {
      result[`${navItem.path}`] = navItem.name;
    }
    return result;
  };

  render() {
    const { navData, location, userMenu } = this.props;
    const navDict = this.constructBreadcrumbDic(navData);

    const pathSnippets = location.pathname.split('/').filter(i => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      // 为了映射第一个面包屑的名称
      let breadcrumbName = '';
      if (index < 1) {
        let key = pathSnippets.slice(0, index + 1).join('');
        const routeItem = lodash.find(userMenu, item => {
          return item.code === MENU_ROUTE_DIC[key];
        });

        breadcrumbName = routeItem ? routeItem.name : '';
      } else {
        if (url.search('detail') !== -1) {
          breadcrumbName = '详情';
        } else {
          breadcrumbName = navDict[url];
        }
      }

      const linkRoute =
        pathSnippets.length - 1 === index ? (
          <span>{breadcrumbName}</span>
        ) : (
          <Link to={url}>{breadcrumbName}</Link>
        );
      return <Breadcrumb.Item key={url}>{linkRoute}</Breadcrumb.Item>;
    });
    return (
      <div className="breadcrumb-wrapper">
        <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>
      </div>
    );
  }
}
