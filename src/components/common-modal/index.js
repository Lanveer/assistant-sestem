import React, {Component, Fragment} from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Table, Button, Icon, Modal, Form, Row, Col,Input,Pagination, message, Spin  } from 'antd';

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
      const {form: { getFieldDecorator }, openModal, openModalData:{record,flag}} = this.props;
      console.log('record data is:', record);
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
                <Col span={18}>
                  <Form.Item label={'条目'} {...formItemLayout}>
                      {getFieldDecorator('item', {
                        initialValue:record && record.item || ''
                      })(
                          <Input/>
                      )}
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item label={'种类'} {...formItemLayout}>
                      {getFieldDecorator('category', {
                          initialValue:record && record.category || ''
                      })(
                          <Input/>
                      )}
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item label={'金额'} {...formItemLayout}>
                      {getFieldDecorator('num', {
                          initialValue:record && record.num || ''
                      })(
                          <Input/>
                      )}
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item label={'支付方式'} {...formItemLayout}>
                      {getFieldDecorator('payMethods', {
                          initialValue:record && record.payMethods || ''
                      })(
                          <Input/>
                      )}
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item label={'消费地点'} {...formItemLayout}>
                      {getFieldDecorator('consumptionPlace', {
                          initialValue:record && record.consumptionPlace || ''
                      })(
                          <Input/>
                      )}
                  </Form.Item>
                </Col>

                {/**/}
                <Col span={18}>
                  <Form.Item label={'消费时间'} {...formItemLayout}>
                      {getFieldDecorator('consumptionDate', {
                          initialValue:record && record.consumptionDate || ''
                      })(
                          <Input/>
                      )}
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item label={'消费者'} {...formItemLayout}>
                      {getFieldDecorator('consumer', {
                          initialValue:record && record.consumer || ''
                      })(
                          <Input/>
                      )}
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item label={'创建时间'} {...formItemLayout}>
                      {getFieldDecorator('createTime', {
                          initialValue:record && record.createTime || ''
                      })(
                          <Input/>
                      )}
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item label={'备注'} {...formItemLayout}>
                      {getFieldDecorator('tips', {
                          initialValue:record && record.tips || ''
                      })(
                          <Input/>
                      )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
        </Fragment>
    );
  }
}

export default CommonModal;
