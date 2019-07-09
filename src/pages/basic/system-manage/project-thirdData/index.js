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
export default class ProjectThird extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mockData: mock1,
    };
  }
  componentDidMount() {
  }

   thirdColumns = [
    {
      title:'三方名称',
      dataIndex:'title',
    },  {
      title:'数据源',
      dataIndex:'from'
    },  {
      title:'操作',
      render: (record) =>{
        return (
          <div>
            {
              record.btnShow ?
              <span style={{cursor:'pointer', color:'#2acd8f'}} onClick={()=>{this.cancelData(record)}}>取消</span>
                :
                <span style={{cursor:'pointer', color:'#2acd8f'}} onClick={()=>{this.chooseData(record)}}>选择</span>
            }
          </div>
        )
      }
    },  {
      title:'是否授权',
      render: (record) =>{
        return (
           <span>
             <Checkbox/>
           </span>
        )
      }
    },
  ];

  // 点击选择讲排序提上去

  chooseData = (record) =>{
    // let old = this.state.mockData;
    // let m= mock1.filter(item=>{
    //   return item.key !== record.key
    // });
    // console.log('filter data is:', m);
    // let temp ={};
    // temp = record;
    // temp.isShowAuth = true;
    // temp.btnShow = true;
    // m.unshift(temp);
    // console.log('old data is:', m);
    this.setState({
      mockData:mock1,
      // mockData:m,
      rowId: record.key,
    })
  };

  // 取消数据
  cancelData = (record) =>{
    console.log('cancel data is:', record);
  };
  // 选中行改变背景色
  setRowClassName = (record) => {
    return record.key === this.state.rowId ? 'clickRowStyl' : '';
  };

  render() {
    const { form: { getFieldDecorator } } = this.props;
    const {mockData} = this.state;
    console.log('mock render data is:', mockData);
    return (
      <div className="sys-wrapper">
        <Row>
          <Col span={8}>
            <Form.Item {...formItemLayout}>
              {getFieldDecorator('third', {
              })(
                <Input placeholder = '请输入三方数据/数据源'/>
              )}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item {...formItemLayout}>
              <Button type="primary">查询 </Button>
            </Form.Item>
          </Col>
        </Row>
        <div className="sys-down">
          <Table
            dataSource={mockData}
            columns={this.thirdColumns}
            pagination={false}
            rowKey={record => record.key}
            loading={false}
            rowClassName={this.setRowClassName}
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


