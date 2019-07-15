import React, {Component, Fragment} from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Table, Button, Icon, Modal, Form, Row, Col,Input,Pagination, message, Spin  } from 'antd';
// import {getList, addList, editeList, deleteList} from 'services/password-manage'
import './style.scss';
class CommonSearchTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tableData:[],
      isLoading:true,
      page:1,
      pagesize:10,
      total:0
    };
  }


  componentDidMount() {

  }

  componentWillReceiveProps(nexeProps){
    if(this.props.tableData !== nexeProps.tableData){
      this.setState({
        tableData:nexeProps.tableData.data,
          total:nexeProps.tableData.total
      })
    }
  }

  render() {
    const {page, total, isLoading,tableData} = this.state;
    const { tableColumns, } = this.props;
    return (
      <div className="common-search-table">
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
