import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Card, Button } from 'antd';
import './style.scss';
import Logo from 'styles/img/logo.jpg';

@connect(state => ({
  isLoading: state.user.loading,
  currentUser: state.user.currentUser,
  needVerifyCode: state.user.needVerifyCode
}))
@Form.create()
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: Date.now()
    };
  }

  componentDidMount() {
  }


  callback=(res)=>{
    console.log('callback res is:', res)
  }

  onLoginClick = () => {
    const { form, dispatch } = this.props;
    form.validateFields((errors, values) => {
      if (errors) return;
      const { user, password } = values;
      dispatch({
        type: 'user/loginAct',
        payload: {
          user,
          password
        },
        callback:(res) => {
          if (res) {
            console.log('call back res is:', res);
          }
        }
      });
    });
  };
  render() {
    const { form, isLoading, currentUser } = this.props;

    const { getFieldDecorator } = form;
    return (
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <img src={Logo} />
            <div className="login-seperator" />
            <h1>个人助手系统</h1>
          </div>
        </div>
        <div className="login-midle" />
        <div className="login-content">
          <div className="login-content-wrapper">
            <div className="login-form-wrapper">
              <Card title="欢迎登录个人助手系统">
                <Form className="login-form">
                  <Form.Item className="login-form-item">
                    {getFieldDecorator('user', {
                      rules: [{ required: true, message: '请输入账号' }]
                    })(
                      <Input
                        disabled={isLoading}
                        placeholder="账号"
                        onPressEnter={this.onLoginClick}
                        prefix={<img src={require('./assets/icon-user.svg')} />}
                      />
                    )}
                  </Form.Item>
                  <Form.Item className="login-form-item">
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入密码' }]
                    })(
                      <Input
                        disabled={isLoading}
                        type="password"
                        placeholder="密码"
                        onPressEnter={this.onLoginClick}
                        prefix={<img src={require('./assets/icon-pwd.svg')} />}
                      />
                    )}
                  </Form.Item>
                </Form>
                <div className="login-btn-wrapper">
                  <Button
                    disabled={isLoading}
                    onClick={this.onLoginClick}
                    size="large"
                    type="primary"
                  >
                    登录
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
