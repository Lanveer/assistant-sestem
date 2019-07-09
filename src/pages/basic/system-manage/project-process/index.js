import React, {PureComponent} from 'react';
import { Form, Row, Col, Select, Button, } from 'antd';
import './style.scss';
import TogglePanel from 'components/toggle-panel';
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
export default class ProjectProcess extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    return (
      <div className="sys-wrapper">
        <div className="sys-top">
          <Row>
            <Col span={8}>
              <Form.Item label={'Policy数'} {...formItemLayout}>
                {getFieldDecorator('policy', {
                  initialValue: '0',
                  rules: [{ required: true, message: '请选择业务类型' }]
                })(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option key='0' value='0'>请选择</Option>
                    <Option key='1' value='2'>含含糊糊</Option>
                    <Option key='2' value='2'>斤斤计较</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={'审批岗位数'} {...formItemLayout}>
                {getFieldDecorator('diaoyong', {
                  initialValue: '0',
                  rules: [{ required: true, message: '请选择调用方' }]
                })(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option key='0' value='0'>请选择</Option>
                    <Option key='1' value='2'>含含糊糊</Option>
                    <Option key='2' value='2'>斤斤计较</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={'验证岗位数'} {...formItemLayout}>
                {getFieldDecorator('validate', {
                  initialValue: '0',
                  rules: [{ required: true, message: '请选择调用方' }]
                })(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option key='0' value='0'>请选择</Option>
                    <Option key='1' value='2'>含含糊糊</Option>
                    <Option key='2' value='2'>斤斤计较</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8} offset={2}>
              <Form.Item {...formItemLayout}>
                <Button type="primary" disabled = {false}>查询</Button>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className="sys-down">
          <div className="sys-down-wrap">
            <TogglePanel title="自动化流程">
              <ul>
                <li>hhh</li>
              </ul>
            </TogglePanel>
          </div>

          <div className="sys-down-wrap">
            <TogglePanel title="简单人审流程">
              <ul>
                <li>hhh</li>
              </ul>
            </TogglePanel>
          </div>
        </div>
        <div className='next-step'>
          <Button type="primary" disabled = {false}>保存</Button>
        </div>
      </div>
    );
  }
}


