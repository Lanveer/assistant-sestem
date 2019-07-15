import React, {Component, Fragment} from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Table, Button, Icon, Modal, Form, Row, Col,Input,Pagination, message, Spin, Select,DatePicker   } from 'antd';
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
        isLoading:false
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
  }
  render() {
      const {isLoading} = this.state;
      const {form: { getFieldDecorator }, openModal,modalData, openModalData:{record,flag}} = this.props;
   console.log('record is:',record);
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
                                // initialValue:`${item.data[parseInt(record && record.category -1)] && item.data[parseInt(record && record.category -1)].category_name || ''}`,
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
                                // initialValue:`${item.data[parseInt(record && record.payMethods -1)] && item.data[parseInt(record && record.payMethods -1)].payMethods_name || ''}`,
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
                      console.log('dddddddd:',record && record[item.dataIndex]);
                      return (
                        <Col span={18} key={item.dataIndex}>
                          {/*{*/}
                            {/*record && record[item.dataIndex] ?*/}
                              {/*<Form.Item label={item.title} {...formItemLayout}>*/}
                                {/*{getFieldDecorator(`${item.dataIndex}`, {// initialValue:`${moment(record && record[item.dataIndex]).format('YYYY-MM-DD HH:mm:ss') || ''}`,*/}
                                  {/*rules: [{ required: `${item.required}`, message: `${item.errMsg}` }]*/}
                                {/*})(*/}
                                  {/*<DatePicker defaultValue={moment(record && record[item.dataIndex], 'YYYY-MM-DD')}/>*/}
                                {/*)}*/}
                              {/*</Form.Item>*/}
                              {/*:*/}
                              {/*<Form.Item label={item.title} {...formItemLayout}>*/}
                                {/*{getFieldDecorator(`${item.dataIndex}`, {*/}
                                  {/*initialValue:`${record && record[item.dataIndex] || ''}`,*/}
                                  {/*rules: [{ required: `${item.required}`, message: `${item.errMsg}` }]*/}
                                {/*})(*/}
                                  {/*<DatePicker defaultValue={moment(new Date(), 'YYYY-MM-DD')}/>*/}
                                {/*)}*/}
                              {/*</Form.Item>*/}
                          {/*}*/}
                          <Form.Item label={item.title} {...formItemLayout}>
                            {getFieldDecorator(`${item.dataIndex}`, {
                              initialValue:`${record && record[item.dataIndex] || ''}`,
                              rules: [{ required: `${item.required}`, message: `${item.errMsg}` }]
                            })(
                              <DatePicker defaultValue={moment(record && record[item.dataIndex], 'YYYY-MM-DD')}/>
                            )}
                          </Form.Item>
                        </Col>
                      )
                    }else{
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
