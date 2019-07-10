import React, { Component } from 'react';
import {
  Form,
  Input,
  Icon,
} from 'antd';
import PublicButton from 'components/public-button';
import {
  DATE_FOMATE,
  FILTER_DATE_FOMATE,
  REVIEW_STATUS_TO_DES
} from 'constants/constant';
import PropTypes from 'prop-types';
import './style.scss';
@Form.create()
export default class OrderSearchHeader extends Component {
  static propTypes = {
    handleSubmitSearch: PropTypes.func,
    handleFilterChannelsByProducts: PropTypes.func,
    channels: PropTypes.object,
    productInfo: PropTypes.object,
    handleResetForm: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getFormFilterParams = () => {
    const { form } = this.props;
    let filterParams = {};
    form.validateFields((errors, values) => {
      if (errors) return;
      filterParams = values;
    });
    return { ...filterParams };
  };

  handleSubmitForm = () => {
    let formCondition = this.getFormFilterParams();
    };


  handleResetForm = () => {
    const { form } = this.props;
    form.resetFields();
  };

  handleAddItem=()=>{
    this.props.handleAddItem()
  };
  render() {
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
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className="order-search-header-wrapper">
        <div className="order-search-header-prams-wrapper">
          <div className="form-item-wrapper">
            <Form.Item label={'借款编号'} {...formItemLayout}>
              {getFieldDecorator('name')(
                <Input placeholder="请输入" style={{ width: '100%' }} />
              )}
            </Form.Item>
          </div>
        </div>
        <div className="search-button-wrapper">
          <PublicButton
            handleClick={this.handleSubmitForm}
            text={'查询'}
            type={'primary'}
            icon={<Icon type="search" />}
            customStyle={{ width: '120px', marginRight: '16px' }}
          />
          <PublicButton
            handleClick={this.handleResetForm}
            customStyle={{ width: '120px', marginRight: '16px' }}
            text={'重置'}
          />
          <PublicButton
            type={'primary'}
            handleClick={this.handleAddItem}
            text={'新增'}
            customStyle={{ width: '120px', marginRight: '16px' }}
          />
        </div>
      </div>
    );
  }
}
