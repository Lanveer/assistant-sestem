import React, {PureComponent} from 'react';
import { Form,Icon, Row, Col, Select, Input, Button, Checkbox  } from 'antd';
import './style.scss';
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

const mock1 = [
  {
    key: 1,
    title: 'ceshi1',
    description: 'descriptio 1',
    chosen: 1,
  },
  {
    key: 2,
    title: 'ceshi2',
    description: 'descriptio 2',
    chosen: 2,
  },
  {
    key: 3,
    title: 'ceshi3',
    description: 'descriptio 3',
    chosen: 3,
  }
];

@Form.create()
export default class TransferMine extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mockData: mock1,
      targetKeys: [2],
      selectedKeys:[]
    };
  }
  componentDidMount() {
  }


  // left search
  leftSerach = ()=>{
     console.log('left search is here')
  };


  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    return (
      <div className="transfer-wrapper">
        <h1>transfer 组件编写</h1>
        <div className="left">
          <div className="left-header">
            <ul>
              <li>
                {getFieldDecorator('third', {
                initialValue: ''
              })(
                <Input placeholder="请输入"/>
              )}</li>
              <li>
                {getFieldDecorator('input', {
              initialValue: '选择'
              })(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    // onChange={onChange}
                    // onFocus={onFocus}
                    // onBlur={onBlur}
                    // onSearch={onSearch}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>
              )}
              </li>
              <li><Button type="primary"  onClick={this.leftSerach}>查询</Button></li>
            </ul>
          </div>
          <div className="left-body">
            <ul>
              <li><Checkbox></Checkbox> <span>通话详单</span> <span>聚信立</span></li>
              <li>22</li>
              <li>44</li>
            </ul>
          </div>
        </div>
        <div className="mid">
          <div>加入右侧  &gt;</div>
          <div>&lt; 加入左侧</div>
        </div>
        <div className="right">
          <div className="right-header">
            <ul>
              <li>&nbsp;</li>
              <li>已选授权</li>
              <li>数据源</li>
              <li>是否必授权</li>
            </ul>
          </div>
          <div className="">
            <ul>
              <li><Checkbox></Checkbox> <span>通话详单</span> <span>聚信立</span></li>
              <li>22</li>
              <li>44</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}


