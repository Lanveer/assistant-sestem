import React from 'react';
import { Link } from 'dva/router';
import { Layout, Menu, Dropdown } from 'antd';
import Logo from 'styles/img/logo.jpg';
import _ from 'lodash';
import { ROUTE_MENU_DIC } from 'constants/constant';
import './style.scss';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;

const commonBottom = {
  fontSize: 18
};

const SECOND_PATH = ['approvelCenter', 'newApprovelCenter', 'postLoan'];
const PageHeader = props => {
  const { history, userInfo, userMenu} = props;
  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={props.logout}>退出</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className="rc-header">
      <div onClick={() => history.push('/passwordManage')} className="rc-header-logo">
        <img src={Logo} />
        <div className="login-seperator" />
        <h1>个人助手系统</h1>
      </div>

      <div className="rc-header-menu">
        <Menu  mode="horizontal" theme="lignt">
          {userMenu.map(item => {
            if (ROUTE_MENU_DIC[item.code] === 'newApprovelCenter') {
              return (
                <SubMenu
                  title="qitafongxi"
                  style={commonBottom}
                  key={`${ROUTE_MENU_DIC[item.code]}`}
                >
                  <Menu.Item key="approvedList">
                    <Link to={{ pathname: '/newApprovelCenter/approvedList' }}>
                      审核
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="supportQuery">
                    <Link to={{ pathname: '/newApprovelCenter/supportQuery' }}>
                      查询
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="sx-approvedList">
                    <Link to={{ pathname: '/newApprovelCenter/sx-approvedList' }}>
                      授审核
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="creditInquiry">
                    <Link to={{ pathname: '/newApprovelCenter/creditInquiry' }}>
                      授查询
                    </Link>
                  </Menu.Item>
                </SubMenu>
              );
            }else if(ROUTE_MENU_DIC[item.code] === 'bookKeeping'){
              return (
                <SubMenu
                  title="记账功能"
                  style={commonBottom}
                  key={`${ROUTE_MENU_DIC[item.code]}`}
                >
                  <Menu.Item key="accountList">
                    <Link to={{ pathname: '/bookKeeping/accountList' }}>
                      账目列表
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="supportQuery">
                    <Link to={{ pathname: '/newApprovelCenter/supportQuery' }}>
                      查询
                    </Link>
                  </Menu.Item>
                </SubMenu>
              );
            }
            return (
              <Menu.Item key={`${ROUTE_MENU_DIC[item.code]}`}>
                <Link to={{ pathname: `/${ROUTE_MENU_DIC[item.code]}` }}>
                  {item.name}
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>

        <div className="rc-header-user">
          欢迎您：
          <Dropdown overlay={menu}>
            <a className="rc-dropdown-link">{userInfo.name}</a>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};
export default PageHeader;

