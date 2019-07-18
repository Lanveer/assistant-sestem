import React, { Component } from 'react';
import moment from 'moment';
import { Table, Button, Icon, Modal, Form, Row, Col,Input,Pagination, message, Spin } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {getList, addList, editeList, deleteList} from 'services/list_service'
import {TIME_FOMATE} from 'constants/constant';
import './style.scss';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
};
const confirm = Modal.confirm;
const FormItem = Form.Item;

@Form.create()
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
      listData:[],
      showEditModal:false,
      isLoading:false,
      page:1,
      pagesize:10,
    }
  }

  componentDidMount(){
    const {page, pagesize} = this.state;
    this.getListData(page, pagesize);
    this.props.onRef && this.props.onRef(this);
  }
  openModal=()=>{
    this.add({},'add')
  };
  // get list data
  getListData = (page=1, pagesize=10)=>{
    this.setState({
      isLoading:true
    });
    const pms = {
      page,
      pagesize,
      credentials:'include'
    };
    getList(pms).then(r=>{
      if(r && r.result.status === 200) {
        this.setState({
          listData:r.result.data,
          total:r.result.total,
          isLoading:false
        })
      }
    });
  };
  //edit
  edit = (record, flag)=>{
    this.setState({
      showEditModal:!this.state.showEditModal,
      flag,
      editId:record.id
    });
    this.props.form.setFieldsValue({
      name: record.name,
      user: record.user,
      pwd: record.pwd,
      tips: record.tips,
      description: record.description,
    });

  };

  add = (record, flag)=>{
    this.setState({
      showEditModal:!this.state.showEditModal,
      flag
    });
    this.props.form.setFieldsValue({
      name: '',
      user: '',
      pwd: '',
      tips: '',
      description: ''
    });
  };

  // delete
  delete = (record)=>{
    let that = this;
    confirm({
      title: `确定要删除名称为${record.name}的数据`,
      content: '删除后可以在数据库备份中找回',
      onOk() {
        deleteList(record.id).then(r=>{
          console.log('r data is:', r);
          if(r && r.result.status === 200) {
            message.success('删除成功');
            that.getListData();
          }else{
            message.error('删除失败');
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };


  // ok
  handleOk = (flag)=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.submitData(flag,values)
      }
    });
    this.setState({
      showEditModal:!this.state.showEditModal
    });

  };

  //cancel
  handleCancel = ()=>{
    this.setState({
      showEditModal:!this.state.showEditModal
    })
  };

  // request
  submitData = (flag, params)=>{
    console.log('Received values of form: ', params);
    let url = 'http://localhost:3001/api/list?id='+this.state.editId+'';
    let mds = flag === 'edit' ? 'PUT' : 'POST';
    let msg = flag === 'edit' ? '修改成功' : '添加成功';
    let err = flag === 'edit' ? '修改失败' : '添加失败';
      this.setState({
          isLoading:true
      });
    if(flag === 'edit'){
      editeList(this.state.editId, params).then(res=>{
        if(res && res.result.status === 200) {
          message.success(msg);
          this.getListData();
            this.setState({
                isLoading:false
            });
        }else{
          message.error(err);
        }
      })
    }else{
      addList(this.state.editId, params).then(res=>{
        if(res && res.result.status === 200) {
          message.success(msg);
          this.getListData();
            this.setState({
                isLoading:false
            });
        }else{
          message.error(err);
        }
      })
    }
  };
  listColumns = [
    {
      title: 'id',
      dataIndex: 'id',
    }, {
      title: '名称',
      dataIndex: 'name',
    }, {
      title: '账号',
      dataIndex: 'user',
    }, {
      title: '密码',
      dataIndex: 'pwd',
    }, {
      title: '提示',
      dataIndex: 'tips',
    }, {
      title: '简述',
      dataIndex: 'description',
    }, {
      title: '操作',
      render:(record)=>{
        return (
          <div className="operate">
            <Button className="edit" type="primary" onClick={()=>{this.edit(record,'edit')}}><Icon type="edit" />编辑</Button>
            <Button className="delete" type="danger" onClick={()=>{this.delete(record,'delete')}}><Icon type="delete" />删除</Button>
          </div>
        )
      }
    }
  ];

  onChange = (page, pagesize) => {
    this.setState({
      page,
      pagesize
    }, ()=>{
      this.getListData(page, pagesize);
    });
  };

  onShowSizeChange = (current, pageSize) =>{
    this.setState({
      page:current,
      pagesize:pageSize
    }, ()=>{
      this.getListData(current, pageSize);
    })
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


  render() {
    const {listData, showEditModal, flag, page, total, isLoading} = this.state;
    const {form: { getFieldDecorator },searchData} = this.props;

    return (
      <div>
        <div className="scl-logo-container">
          {/*<Button className="add" type="primary" onClick={()=>{this.add({},'add')}}><Icon type="add" />新增</Button>*/}
          <Spin spinning={isLoading}>
            <Table
              style={{clear:'both'}}
              className="dr-table"
              dataSource={listData}
              columns={this.listColumns}
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

        <Modal
          title={flag === 'add' ? '新增' : '编辑'}
          visible={showEditModal}
          onOk={()=>{this.handleOk(flag)}}
          onCancel={this.handleCancel}
        >
          <Form>
            <Row gutter={8}>
              <Col span={18}>
                <Form.Item label={'名称'} {...formItemLayout}>
                  {getFieldDecorator('name', {
                  })(
                    <Input/>
                  )}
                </Form.Item>
              </Col>
              <Col span={18}>
                <Form.Item label={'账号'} {...formItemLayout}>
                  {getFieldDecorator('user', {
                  })(
                    <Input/>
                  )}
                </Form.Item>
              </Col>
              <Col span={18}>
                <Form.Item label={'密码'} {...formItemLayout}>
                  {getFieldDecorator('pwd', {
                  })(
                    <Input/>
                  )}
                </Form.Item>
              </Col>
              <Col span={18}>
                <Form.Item label={'提示'} {...formItemLayout}>
                  {getFieldDecorator('tips', {
                  })(
                    <Input/>
                  )}
                </Form.Item>
              </Col>
              <Col span={18}>
                <Form.Item label={'描述'} {...formItemLayout}>
                  {getFieldDecorator('description', {
                  })(
                    <Input/>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
