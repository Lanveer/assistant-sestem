import React, {Component, Fragment} from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Table, Button, Icon, Modal, Form, Row, Col,Input,Pagination, message, Spin, Select   } from 'antd';
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
      console.log('modalData data is:', modalData);
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
                      return (
                        <Col span={18} key={item.dataIndex}>
                          <Form.Item label={item.title} {...formItemLayout}>
                            {getFieldDecorator(`${item.dataIndex}`, {
                              initialValue:`${record && record[item.dataIndex] || ''}`,
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
                {/*<Col span={18}>*/}
                  {/*<Form.Item label={'条目'} {...formItemLayout}>*/}
                      {/*{getFieldDecorator('item', {*/}
                        {/*initialValue:'jack',*/}
                        {/*rules: [{ required: true, message: '请输入密码' }]*/}
                      {/*})(*/}
                        {/*<Select*/}
                                {/*style={{ width: 200 }}*/}
                                {/*showSearch={false}>*/}
                            {/*<Option value="1jack">jack</Option>*/}
                        {/*</Select>*/}
                      {/*)}*/}
                  {/*</Form.Item>*/}
                {/*</Col>*/}
              </Row>
            </Form>
          </Modal>
        </Fragment>
    );
  }
}

export default CommonModal;
