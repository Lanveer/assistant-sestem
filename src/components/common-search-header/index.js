import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Icon, Button } from 'antd';
import './style.scss';
@Form.create()
class CommonSearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    // console.log('this,props data is:', this.props);
  }

  handleResetForm = () => {
    const { form } = this.props;
    form.resetFields();
  };

  handleSubmitForm = () => {
    const { form } = this.props;
    form.validateFields((errors, values) => {
      if (errors) return;
      this.props.submitData(values)
    });
  };

  render() {

    const {
      form: { getFieldDecorator },
      formData
    } = this.props;
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

    return (
      <div className="common-search-header">
        <div className="common-search-header-wrapper">
          <div className="common-search-header-prams-wrapper">
            <div className="form-item-wrapper">
              <ul>
                {
                  formData.map(item=>{
                    return(
                      <li key={item.name}>
                        <Form.Item label={item.name} {...formItemLayout}>
                          {getFieldDecorator(`${item.name}`)(
                            <Input placeholder="请输入" style={{ width: '100%' }} />
                          )}
                        </Form.Item>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
          <div className="common-search-header-button-wrapper">
            <Button onClick={()=>{this.handleSubmitForm()}} type="primary" icon="search">查询</Button>
            <Button onClick={()=>{this.handleResetForm()}} type="ghost" icon="delete">重置</Button>
          </div>
        </div>
      </div>
    );
  }
}
export default CommonSearchHeader;
