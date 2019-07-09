import React, { PureComponent } from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';

@connect(state => ({
  global: state.global
}))
export default class ConfigRoute extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.redireRoute();
  }

  // 路由跳转
  redireRoute = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/getUserMenuAct'
    });
  };

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Spin />
      </div>
    );
  }
}
