import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

const SubMenu = Menu.SubMenu;

export default function ApprovelContent(props) {
  const { pathname } = props;

  const pathArray = pathname.split('/');
  let selectKey = pathArray.length > 2 ? pathArray[2] : 'backlog';

  return (
    <Menu
      style={{ width: 256, float: 'left', marginRight: 16 }}
      selectedKeys={[selectKey]}
      mode="inline"
      defaultOpenKeys={['sub1']}
    >
      <SubMenu
        key="sub1"
        title={
          <span>
            <Icon type="folder" theme="outlined" />
            <span>档案管理哈哈</span>
          </span>
        }
      >
        <Menu.Item key="tipManage">
          <Link to={{ pathname: '/fileManage/tipManage'}}>提示管理哈哈</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}
