import React, { Component } from 'react';
import moment from 'moment';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  TIME_FOMATE,
  REVIEW_STATUS_TO_DES,
  ISSUE_STATUS
} from 'constants/constant';
import { Base64 } from 'js-base64';
import { numberFormat } from 'utils/common';
import './style.scss';

export default class OrderSearchResult extends Component {
  static propTypes = {
    currentPage: PropTypes.number,
    isLoading: PropTypes.bool,
    result: PropTypes.array,
    handleSetActivePageButton: PropTypes.func,
    activePageButton: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.state = {
      jumpPage: null
    };
  }

  jumpDetailPage = record => {
    const { history } = this.props;
    const { applicationId, productCode } = record;

    let recordUrl = Base64.encode(Base64.encode(JSON.stringify(record)));
    const path = {
      pathname: '/search/orderinfo',
      search: `?applicationId=${Base64.encode(
        applicationId
      )}&productCode=${Base64.encode(productCode)}&record=${recordUrl}`
    };
    history.push(path);
  };

  setDefaultValue = (value, type = 'text', record = {}) => {
    let renderStr = '-';
    if (!_.isNull(value) && !_.isUndefined(value)) {
      renderStr = value;
      if (type === 'date') {
        renderStr = moment(value).format(TIME_FOMATE);
      }
    }
    return <span>{renderStr}</span>;
  };

  columns = [
    {
      title: '编号',
      dataIndex: 'applicationId',
      key: 'applicationId',
      render: text => {
        return this.setDefaultValue(text);
      }
    },
    {
      title: '借号',
      dataIndex: 'loanId',
      key: 'loanId',
      render: text => {
        return this.setDefaultValue(text);
      }
    },
    {
      title: '借人',
      dataIndex: 'realName',
      key: 'realName',
      render: text => {
        return this.setDefaultValue(text);
      }
    },
    {
      title: '城',
      dataIndex: 'city',
      key: 'city',
      render: text => {
        return this.setDefaultValue(text);
      }
    },
    {
      title: '名称',
      dataIndex: 'productName',
      key: 'productName',
      render: text => {
        return this.setDefaultValue(text);
      }
    },
    {
      title: '渠',
      dataIndex: 'channelName',
      key: 'channelName',
      render: text => {
        return this.setDefaultValue(text);
      }
    },
    {
      title: '申额(元',
      key: 'appAmount',
      dataIndex: 'appAmount',
      render: text => {
        return this.setDefaultValue(text, 'moneny');
      }
    },
    {
      title: '申请时间',
      key: 'appDate',
      dataIndex: 'appDate',
      render: text => {
        return this.setDefaultValue(text, 'date');
      }
    },

    {
      title: '操作',
      dataIndex: 'operate',
      render: (text, record) => {
        return <a onClick={() => this.jumpDetailPage(record)}>详情</a>;
      }
    }
  ];

  render() {
    const { result, isLoading } = this.props;
    return (
      <div className="search-result-wrapper">
        <Table
          loading={isLoading}
          columns={this.columns}
          dataSource={result}
          pagination={false}
          rowKey={record => record.applicationId}
        />
      </div>
    );
  }
}
