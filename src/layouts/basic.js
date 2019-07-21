import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { RESPONSIVE_QUERY } from 'constants/constant';
import { connect } from 'dva';
import { Layout, Spin } from 'antd';
import PageHeader from 'components/page-header';
import PageConten from 'components/page-content';
const userMenu = [
  {
    "code": "passwordManage",
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
    "code": "bookKeeping",
    "name": "记账功能123",
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
    "name": "密码管理2",
    "order": 0,
    "parentId": null,
    "id": null,
    "status": null,
    "enabledAll": null,
    "subMenuList": [

    ]
  },
  {
    "code": "bookManage",
    "name": "图书管理",
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
    "name": "密码管理4",
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
    "name": "密码管理5",
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
    "name": "密码管理6",
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
    this.state={
      currentUser:''
    }
  }

  componentDidMount() {
    let currentUser =localStorage.getItem('user');
    this.setState({
      currentUser
    })

  }

  logout() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/logoutAct'
    });
  }
  render() {
    const { history, navData, match} = this.props;
    const {currentUser} = this.state;
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
                  userInfo={{name:currentUser}}
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
