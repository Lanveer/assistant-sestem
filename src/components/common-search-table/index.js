import React, {Component, Fragment} from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Table, Button, Icon, Modal, Form, Row, Col,Input,Pagination, message, Spin  } from 'antd';
import {getList, addList, editeList, deleteList} from 'services/password-manage'
import './style.scss';
class CommonSearchTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData:[],
      isLoading:true,
      page:1,
      pagesize:10,
    };
  }


  componentDidMount() {
  }
  render() {
    const {page, total, isLoading} = this.state;
    const { tableColumns, tableData } = this.props;
    return (
      <div className="common-search-table">
        <Button className="add" type="primary" onClick={()=>{this.add({},'add')}}><Icon type="add" />新增</Button>
        <Spin spinning={false}>
          <Table
            style={{clear:'both'}}
            className="dr-table"
            dataSource={tableData}
            columns={tableColumns}
            loading={false}
            pagination={false}
            bordered={true}
            rowKey={(record, idx) => idx}
          />
          <Pagination
            style={{float:'right', marginTop:20}}
            current={page}
            onChange={this.onChange}
            onShowSizeChange={this.onShowSizeChange}
            total={total}
            showSizeChanger
          />
        </Spin>
      </div>
    );
  }
}

export default CommonSearchTable;
