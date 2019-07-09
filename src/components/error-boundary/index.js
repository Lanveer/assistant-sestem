import React, { Component } from 'react';
import _ from 'lodash';
import { Modal, message, Alert } from 'antd';
import Raven from 'raven-js';
import { getEnvSuffix } from 'utils/common';
const envStr = getEnvSuffix();
/*
*全局捕获错误组件
*/
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, visible: false };
  }

  componentDidMount() {
    if (envStr === '-demo') {
      Raven.config(
        'http://380749e87f364c3aa03fd8e91c602bf9@10.18.17.105:9000/2'
      ).install();
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error.toString(),
      errorInfo: errorInfo,
      visible: true
    });
    if (envStr === '-demo') {
      Raven.captureException(error, { extra: errorInfo });
    }
  }

  reFreshpage = () => {
    this.timer = setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  handleImproveIssue = (helpImprove = false) => {
    if (helpImprove) {
      message.success('我们已收到你的反馈将在第一时间处理，谢谢你的帮助');
      if (envStr === '-demo') {
        const { error, errorInfo } = this.state;
        Raven.captureException(error, { extra: errorInfo });
      }
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.reFreshpage();
    } else {
      this.reFreshpage();
    }
  };

  render() {
    if (!_.isNull(this.state.error)) {
      return (
        <div>
          <Modal
            title="我们可能遇到一个小问题"
            visible={this.state.visible}
            onOk={() => this.handleImproveIssue(true)}
            onCancel={() => this.handleImproveIssue()}
            okText={'帮助改进'}
          >
            <Alert
              message="抱歉，我们可能遇到一点小问题，给你带来不便请谅解，希望能理解并帮助我们改善。祝工作愉快"
              type="warning"
            />
          </Modal>
        </div>
      );
    }
    return this.props.children;
  }
}
