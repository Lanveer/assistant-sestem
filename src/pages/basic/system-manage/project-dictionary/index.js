import React, {PureComponent} from 'react';
import { Form, Button, Checkbox, Table, Input, Row, Col } from 'antd';
import './style.scss';
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
    title: '淘宝1',
    from: '爱立信1',
    btnShow:false
  },
  {
    key: 2,
    title: '淘宝2',
    from: '爱立信2',
    btnShow:false
  },
  {
    key: 3,
    title: '淘宝3',
    from: '爱立信23',
    btnShow:false
  },
];

@Form.create()
export default class ProjectDictionary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mockData1: mock1,
    };
  }
  componentDidMount() {
  }

   dictionary1 = [
    {
      title:'字段分类',
      dataIndex:'title',
    },
     {
      title:'字段显示名',
      dataIndex:'from'
    },
     {
       title:'字段参数名',
       dataIndex:'title',
     },
     {
       title:'字段描述',
       dataIndex:'from'
     },
     {
       title:'初审',
       dataIndex:'from',
       children: [
         {
           title:'必填',
           dataIndex:'b1'
         },
         {
           title:'展示',
           dataIndex:'b1'
         },
         {
           title:'可退回修改',
           dataIndex:'b1'
         },
         ]
     },
     {
       title:'终审',
       dataIndex:'from',
       children: [
         {
           title:'必填',
           dataIndex:'b1'
         },
         {
           title:'展示',
           dataIndex:'b1'
         },
         {
           title:'可退回修改',
           dataIndex:'b1'
         },
       ]
     }
  ];


  render() {
    const { form: { getFieldDecorator } } = this.props;
    const {mockData1} = this.state;
    return (
      <div className="sys-wrapper">
        <div className="sys-down">
          <Table
            dataSource={mockData1}
            columns={this.dictionary1}
            pagination={false}
            rowKey={record => record.key}
            loading={false}
            rowClassName={this.setRowClassName}
            bordered
            scroll={{ x: '130%'}}
          />
        </div>
        <div className='next-step'>
          <Button type="primary" disabled = {false} style={{marginRight:20}}>重置</Button>
          <Button type="primary" disabled = {false}>保存</Button>
        </div>
      </div>
    );
  }
}


