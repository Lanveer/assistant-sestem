import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { RESPONSIVE_QUERY } from 'constants/constant';
import { connect } from 'dva';
import { Layout, Spin } from 'antd';
import PageHeader from 'components/page-header';
import PageConten from 'components/page-content';
import _ from 'lodash';

const userMenu = [
  {
    "code": "reporting",
    "name": "密码管理",
    "order": 0,
    "parentId": null,
    "id": null,
    "status": null,
    "enabledAll": null,
    "subMenuList": [

    ]
  },
  {
    "code": "dashboard",
    "name": "信息板",
    "order": 0,
    "parentId": null,
    "id": null,
    "status": null,
    "enabledAll": null,
    "subMenuList": [

    ]
  },
  {
    "code": "credit",
    "name": "审批中心",
    "order": 0,
    "parentId": null,
    "id": null,
    "status": null,
    "enabledAll": null,
    "subMenuList": [

    ]
  },
  {
    "code": "credit_supply_chain",
    "name": "审批中心(供应链)",
    "order": 0,
    "parentId": null,
    "id": null,
    "status": null,
    "enabledAll": null,
    "subMenuList": [

    ]
  },
  {
    "code": "archive",
    "name": "档案管理",
    "order": 0,
    "parentId": null,
    "id": null,
    "status": null,
    "enabledAll": null,
    "subMenuList": [

    ]
  },
  {
    "code": "post_loan",
    "name": "贷后管理",
    "order": 0,
    "parentId": null,
    "id": null,
    "status": null,
    "enabledAll": null,
    "subMenuList": [

    ]
  },
  {
    "code": "system_manage",
    "name": "系统管理",
    "order": 0,
    "parentId": null,
    "id": null,
    "status": null,
    "enabledAll": null,
    "subMenuList": [

    ]
  }
];
@connect(state => ({
  currentUser: state.user.currentUser,
  global: state.global
}))
export default class BasicLayout extends PureComponent {
  static propTypes = {
    app: PropTypes.object,
    match: PropTypes.object,
    navData: PropTypes.array,
    getRouteData: PropTypes.func,
    location: PropTypes.object
  };



  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
  }

  logout() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/logoutAct'
    });
  }

  render() {
    const { history, navData, match } = this.props;
    const showMenu = true;
    return (
      <ContainerQuery query={RESPONSIVE_QUERY}>
        {params => (
          <div
            className={classNames(['rc-layout-wrapper', params])}
            style={{ width: '100%', height: '100%' }}
          >
            {showMenu && (
              <Layout
                style={{ width: '100%', height: '100%', minWidth: '1310px' }}
              >
                <PageHeader
                  key="header"
                  history={history}
                  logout={this.logout}
                  userInfo={{name:'lanveer'}}
                  userMenu={userMenu}
                />
                <PageConten
                  navData={navData}
                  history={history}
                  match={match}
                  userMenu={userMenu}
                />
              </Layout>
            )}

          </div>
        )}
      </ContainerQuery>
    );
  }
}
