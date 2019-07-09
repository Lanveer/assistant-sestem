import React, {PureComponent} from 'react';
import { Form, Icon, Row, Col, Select, Input, Button, } from 'antd';
import './style.scss';
const Option = Select.Option;
import {addProperty, addVersionProperty} from '../sys-services'
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
export default class ProjectProperty extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    console.log('need data is:', this.props.proInfos);

  }

  componentWillMount(){
    // console.log('eeeeeee:', this.props.proInfos);
  }

  addProperties =()=>{
    const { form } = this.props;
    form.validateFields((errors, values) => {
      if (errors) return;
      let {version, versionDesc, ...pms} = values;
      let {bizType, confName,creditReviewType,description, productCode, ...pms2} = values;
      pms2.id= 12;
      // this.propertiesAdd(pms, pms2);
      let test =  {
        // "bizType": "BUSINESS_LOAN",
        // "confName": "项目名称",
        // "creditReviewType": "CREDIT",
        "subCreditReviewType": "NEW",
        // "description": "项目描述",
        // "productCode": "PL-OCL-WJDAI01-000000-01",
        "sourceSystem": "CREDITAPP",
        "tenant": "RL"
      };
      this.propertyAdd(pms);
    });
  };

  // 提交属性和版本
  // propertiesAdd = (pms,pms2)=>{
  //   Promise.all([this.propertyAdd(pms),this.addVersionProperty(pms2)]).then(res=>{
  //     console.log('res data is:', res);
  //   })
  // };

  // 项目属性新增
  propertyAdd = (pms)=>{
    return new Promise((resolve, reject)=>{
      addProperty(pms).then(r=>{
        console.log('r save data is:', r);
        if(r){
          resolve(r)
        }
        reject('wrong')
      })
    })
  };

  // 项目version属性新增
  addVersionProperty = (pms2)=>{
    return new Promise((resolve, reject)=>{
      addVersionProperty(pms2).then(r=>{
        console.log('r save data is:', r);
        if(r){
          resolve(r)
        }
        reject('add version wrong')
      })
    });
  };


  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    return (
      <div className="sys-wrapper">
        <div>
          <Row>
            <Col span={12}>
              <Form.Item label={'业务类型'} {...formItemLayout}>
                {getFieldDecorator('bizType', {
                })(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option key='PERSONAL_LOAN' value='PERSONAL_LOAN'>个贷</Option>
                    <Option key='BUSINESS_LOAN' value='BUSINESS_LOAN'>商贷</Option>
                    <Option key='SUPPLY_CHAIN' value='SUPPLY_CHAIN'>供应链</Option>
                    <Option key='ONLINE' value='ONLINE'>Online</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={'调用方'} {...formItemLayout}>
                {getFieldDecorator('creditReviewType', {
                })(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option key='CREDIT' value='CREDIT'>CREDIT</Option>
                    <Option key='LOAN ' value='LOAN '>LOAN</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label={'项目名称'} {...formItemLayout}>
                {getFieldDecorator('confName', {
                  rules: [{ required: true, message: '请输入项目名称' }]
                })(
                  <Input placeholder="请输入产品名称" />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={'ProductCode'} {...formItemLayout}>
                {getFieldDecorator('productCode', {
                  rules: [{ required: true, message: '请输入productCode' }]
                })(
                  <Input placeholder="请输入Productcode" />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} pull={3}>
              <Form.Item label={'项目描述'} {...formItemLayout}>
                {getFieldDecorator('description')(
                  <Input.TextArea
                    placeholder="请输入项目描述"
                    style={{ width: '100%', height:'120px' }}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label={'版本号'} {...formItemLayout}>
                {getFieldDecorator('version', {
                  initialValue: 'V1',
                })(
                  <Input placeholder="请输入版本号" disabled={true}/>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} pull={3}>
              <Form.Item label={'版本描述'} {...formItemLayout}>
                {getFieldDecorator('versionDesc')(
                  <Input.TextArea
                    placeholder="请输入版本描述"
                    style={{ width: '100%', height:'120px' }}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className='next-step'>
          <Button type="primary" disabled = {false}  onClick={()=>{this.addProperties()}}>保存</Button>
        </div>
      </div>
    );
  }
}


