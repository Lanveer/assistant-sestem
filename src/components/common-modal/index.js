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
        isLoading:false,
        flag:'add'
    };
  }

    // ok
    handleOk = (flag)=>{
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // this.submitData(flag,values)
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
        </Fragment>
    );
  }
}

export default CommonModal;
