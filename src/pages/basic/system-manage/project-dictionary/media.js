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



const mediaMock = [
  {
    id: 1,
    from: '用户上传',
    name: '身份证',
    pname: 'name',
    btnShow:false
  }
];

@Form.create()
export default class ProjectDictionaryMedia extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mediaMock: mediaMock,
    };
  }
  componentDidMount() {
  }

   media = [
    {
      title:'附件来源',
      dataIndex:'from',
    },
     {
      title:'附件名称',
      dataIndex:'name'
    },
     {
       title:'附件参数名',
       dataIndex:'pname',
     },
     {
       title:'可退回修改',
       dataIndex:'back'
     }
  ];
  render() {
    const { form: { getFieldDecorator } } = this.props;
    const {mediaMock} = this.state;
    return (
      <div className="sys-wrapper">
        <div className="sys-down">
          <Table
            dataSource={mediaMock}
            columns={this.media}
            pagination={false}
            rowKey={record => record.key}
            loading={false}
            rowClassName={this.setRowClassName}
            bordered
          />
        </div>
      </div>
    );
  }
}


