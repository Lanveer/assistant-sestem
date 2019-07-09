import React, {PureComponent} from 'react';
import { Form, Icon, Row, Col, Select, Input, Button, Spin   } from 'antd';
import TogglePanel from 'components/toggle-panel';
import {getMenus, addMenus, forbidMenus} from 'services/sys-manage';
import {getprojectConfigList, getprojectVesionList} from '../sys-services'
import './style.scss';
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};
@Form.create()
export default class FirstStep extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nextStep:true,
      sp:false,
      styleFlag:false,
      styleFlag2:false,
      isNew:false,
      configList:[],
      productVersion:[],
      from:''
    };
  }
  componentDidMount() {
    this.getprojectConfigList();
  }

  nextStep = (e)=>{
    this.props.nextStep(e)
  };
  // 获取项目配置列表
  getprojectConfigList = ()=>{
    getprojectConfigList().then(r=>{
      if(r) {
        this.setState({
          configList:r.result
        })
      }
    })
  };

  // onchange 获得version
  getversion = (id)=>{
    this.setState({
      sp:true,
      productVersion:[],
      styleFlag:false,
      styleFlag2:!this.state.styleFlag,
      nextStep: false,
      isNew:!this.state.isNew,
      from:'copy'
    }, ()=>{
      this.getprojectVesionList(id)
    });

  };

  // 获取项目版本列表
  getprojectVesionList = (id)=>{
    getprojectVesionList(id).then(r=>{
      this.setState({
        sp:false,
        productVersion:r.result
      });
      console.log('r data is:', r);
    })
  };


  // new project
  newProject =()=>{
    this.setState({
      isNew:!this.state.isNew,
      nextStep: this.state.styleFlag,
      styleFlag:!this.state.styleFlag,
      styleFlag2:false,
      from:'new'
    })
  };


  render() {
    const {nextStep, configList, productVersion, sp, styleFlag,styleFlag2, isNew, from} = this.state;
    let params = {isNew, from, id:[1,2,3]};
    const {
      form: { getFieldDecorator }
    } = this.props;
    console.log('productVersion data is:', productVersion);
    return (
      <div className="sys-wrapper">
        <TogglePanel title="新建项目">
          <div className="sys-wrapper-item" id={!styleFlag ? '': 'new-pro'}>
            <div className="wrapper-item" style={{cursor: 'pointer'}} onClick={()=>{this.newProject()}}>
              <Icon type="plus"/>新建项目
            </div>
          </div>
        </TogglePanel>
        <TogglePanel title="拷贝现有项目">
          <div className="sys-wrapper-item" id={!styleFlag2 ? '': 'copy-pro'}>
            <div className="wrapper-item2" style={{cursor: 'pointer'}}>
             <div className='wrapper-head'> <Icon type="plus"/>拷贝现有项目 </div>
              <div className='wrapper-form'>
                <Row>
                  <Col span={24}>
                    <Form.Item {...formItemLayout}>
                      {getFieldDecorator('pro', {
                      })(
                        <Select
                          style={{ width: '200px' }}
                          placeholder='请选择项目名称/ProductCode'
                          onChange = {(key)=>{this.getversion(key)}}
                        >
                          {
                            configList.map(item=>{
                              return(
                                <Option key={item.confCode} value={item.id}>{item.confName}</Option>
                              )
                            })
                          }
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                      <Form.Item>
                        {getFieldDecorator('version', {
                        })(
                          <Spin size="small" spinning={sp}>
                          <Select
                            placeholder='请选择版本'
                            style={{ width: '200px' }}
                          >
                            {
                              productVersion.map(item=>{
                                return (
                                  <Option key={`${item.id}+12`} value={item.procConfId}>{item.version}</Option>
                                )
                              })
                            }
                          </Select>
                          </Spin>
                        )}
                      </Form.Item>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </TogglePanel>
        {
          true ? null :
            <TogglePanel title="套用模板">
              <div className="sys-template">
                <div className='sys-template-item'>
                  <div className='sys-template-item-top'>
                    <h1>供模板</h1>
                    <p>顺序</p>
                    <h2>简要的介绍。。。。</h2>
                  </div>
                  <div className='sys-template-item-down'>预览</div>
                </div>
                <div className='sys-template-item'>
                  <div className='sys-template-item-top'>
                    <h1>供模板</h1>
                    <p>顺序</p>
                    <h2>简要的介绍。。。。</h2>
                  </div>
                  <div className='sys-template-item-down'>预览</div>
                </div>
                <div className='sys-template-item'>
                  <div className='sys-template-item-top'>
                    <h1>供模板</h1>
                    <p>顺序</p>
                    <h2>简要的介绍。。。。</h2>
                  </div>
                  <div className='sys-template-item-down'>预览</div>
                </div>
              </div>
            </TogglePanel>
        }
        <div className='next-step'>
          <Button type="primary" disabled = {nextStep} onClick={()=>{this.nextStep(params)}}>下一步</Button>
        </div>
      </div>
    );
  }
}

