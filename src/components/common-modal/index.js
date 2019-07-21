import React, {Component, Fragment} from 'react';
import moment from 'moment';
import './style.scss';
import _ from 'lodash';
// import {upload} from 'services/upload_service';
import { Table, Button, Icon, Modal, Form, Row, Col,Input,Upload, message, Spin, Select,DatePicker   } from 'antd';
const Option = Select.Option;
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
@Form.create()
class CommonModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading:false,
        flag:false,
        record:{}
    };
  }
    // ok
    handleOk = (flag)=>{
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.operateModal(values,flag)
            }
        });
    };

    //cancel
    handleCancel = ()=>{
        this.props.operateModal({},'cancel')
    };
  componentDidMount() {
    console.log('modal data is:', this.props);
    this.setState({
      flag:this.props.openModalData.flag,
      record:this.props.openModalData.record,
    })
  }


  componentWillReceiveProps(){
    console.log('modal data is:', this.props);

  }
  // disabledDate = (current) => {
  //   return current && current.valueOf() < moment().startOf('day');
  // };


  upload =(file)=>{
    console.log('file is:', file);
  };



  render() {
      const {isLoading, record, flag} = this.state;
      const {form: { getFieldDecorator }, openModal,modalData,} = this.props;

      const uploadProps = {
        action: `api/upload?flag='book_list'&id=1`,
        listType: 'picture',
        defaultFileList: [],
        className: 'upload-list-inline',
      };

  console.log('record is:', record);
    return (
        <Fragment>
          <Modal
              title={flag === 'add' ? '新增' : '编辑'}
              visible={openModal}
              onOk={()=>{this.handleOk(flag)}}
              onCancel={this.handleCancel}
          >
            <Form>
              <Row gutter={8}>
                {
                  modalData && modalData.map(item=>{
                    if(item.type=== 'select'){
                      if(item.dataIndex === 'category'){
                        return (
                          <Col span={18} key={item.dataIndex}>
                            <Form.Item label={item.title} {...formItemLayout}>
                              {getFieldDecorator(`${item.dataIndex}`, {
                                initialValue:`${record && record.category|| ''}`,
                                rules: [{ required: `${item.required}`, message: `${item.errMsg}` }]
                              })(
                                <Select showSearch={false}>
                                  {
                                    item.data && item.data.map(c_item=>{
                                      return(
                                        <Option value={c_item.category_code} key={`${c_item.category_code}`}> {c_item.category_name}</Option>
                                      )
                                    })
                                  }
                                </Select>
                              )}
                            </Form.Item>
                          </Col>
                        )
                      }else if(item.dataIndex === 'payMethods'){
                        return (
                          <Col span={18} key={item.dataIndex}>
                            <Form.Item label={item.title} {...formItemLayout}>
                              {getFieldDecorator(`${item.dataIndex}`, {
                                initialValue:`${record && record.payMethods|| ''}`,
                                rules: [{ required: `${item.required}`, message: `${item.errMsg}` }]
                              })(
                                <Select showSearch={false}>
                                  {
                                    item.data && item.data.map(c_item=>{
                                      return(
                                        <Option value={c_item.payMethods_code} key={`${c_item.payMethods_name}`}> {c_item.payMethods_name}</Option>
                                      )
                                    })
                                  }
                                </Select>
                              )}
                            </Form.Item>
                          </Col>
                        )
                      }
                    }else if(item.type=== 'date'){
                      console.log('fuck data:',record && record[item.dataIndex]);
                      return (
                        <Col span={18} key={item.dataIndex}>
                          {
                            record && record[item.dataIndex] ?
                              <Form.Item label={item.title} {...formItemLayout}>
                                {getFieldDecorator(`${item.dataIndex}`,
                                  {
                                  rules: [{ required: `${item.required}`, message: `${item.errMsg}` }],
                                  initialValue: moment(record && record[item.dataIndex])
                                })(
                                  <DatePicker
                                    format={'YYYY-MM-DD HH:mm:ss'}
                                  />
                                )}
                              </Form.Item>
                              :
                              <Form.Item label={item.title} {...formItemLayout}>
                                {getFieldDecorator(`${item.dataIndex}`, {
                                  rules: [{ required: `${item.required}`, message: `${item.errMsg}` }],
                                  initialValue: moment(new Date())

                                })(
                                  <DatePicker
                                    format={'YYYY-MM-DD HH:mm:ss'}
                                  />
                                )}
                              </Form.Item>
                          }
                        </Col>
                      )
                    }
                    else if(item.type === 'file'){
                      return(
                        <Col span={18} key={item.dataIndex}>
                          <Form.Item label={item.title} {...formItemLayout}>
                            <Upload { ...uploadProps}>
                              <Button>
                                <Icon type="upload" /> 上传封面
                              </Button>
                            </Upload>
                          </Form.Item>
                        </Col>
                      )
                    }
                    else{
                      return(
                        <Col span={18} key={item.dataIndex}>
                          <Form.Item label={item.title} {...formItemLayout}>
                            {getFieldDecorator(`${item.dataIndex}`, {
                              initialValue:`${record && record[item.dataIndex] || ''}`,
                              rules: [{ required: `${item.required}`, message: `${item.errMsg}` }]
                            })(
                              <Input/>
                            )}
                          </Form.Item>
                        </Col>
                      )
                    }
                  })
                }
              </Row>
            </Form>
          </Modal>
        </Fragment>
    );
  }
}
export default CommonModal;
