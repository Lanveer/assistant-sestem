import React, { Component } from 'react';
import { connect } from 'dva';
import {  Button, Icon } from 'antd';
import '.././style.scss';
import CommonSearchHeader from 'components/common-search-header';
import CommonSearchTable from 'components/common-search-table';
import moment from 'moment/moment';
import {TIME_FOMATE} from 'constants/constant';

function setDefaultValue(value, type = 'text', record = {}) {
  let renderStr = '-';
  if (!_.isNull(value) && !_.isUndefined(value)) {
    console.log('value is:', value);
    renderStr = value;
    if (type === 'date') {
      renderStr = moment(value).format(TIME_FOMATE);
    }
  }
  return <span>{renderStr}</span>;
}
const formData = [
  {
    name:'name',
    value:true,
    errMsg:'must have!'
  },
  {
    name:'pwd',
    value:true,
    errMsg:'must have!'
  }
];
const tableColumns=[
  {
    title: '序号',
    dataIndex: 'id',
    render:(text)=>{
      return(
        setDefaultValue(text)
      )
    }
  },
  {
    title: '条目',
    dataIndex: 'item',
    render:(text)=>{
      return(
        setDefaultValue(text)
      )
    }
  },
  {
    title: '种类',
    dataIndex: 'category',
    render:(text)=>{
      return(
        setDefaultValue(text)
      )
    }
  },
  {
    title: '金额',
    dataIndex: 'num',
    render:(text)=>{
      return(
        setDefaultValue(text)
      )
    }
  },
  {
    title: '支付方式',
    dataIndex: 'payMethods',
    render:(text)=>{
      return(
        setDefaultValue(text)
      )
    }
  },
  {
    title: '消费地点',
    dataIndex: 'consumptionPlace',
    render:(text)=>{
      return(
        setDefaultValue(text)
      )
    }
  },
  {
    title: '消费时间',
    dataIndex: 'consumptionDate',
    render:(text)=>{
      return(
        setDefaultValue(text)
      )
    }
  },
  {
    title: '消费者',
    dataIndex: 'consumer',
    render:(text)=>{
      return(
        setDefaultValue(text)
      )
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    render:(text)=>{
      return(
        setDefaultValue(text)
      )
    }
  },
  {
    title: '备注',
    dataIndex: 'tips',
    render:(text)=>{
      return(
        setDefaultValue(text)
      )
    }
  },
  {
    title: '操作',
    dataIndex: 'operate',
    render:(record)=>{
      return (
        <div className="operate">
          <Button className="edit" type="primary" onClick={()=>{this.edit(record,'edit')}}><Icon type="edit" />编辑</Button>
          <Button className="delete" type="danger" onClick={()=>{this.delete(record,'delete')}}><Icon type="delete" />删除</Button>
        </div>
      )
    }
  },
];
const tableData=[
  {
   id:1,
   item:'eating',
   category:'sales',
   num:100,
   payMethods:'ant pay',
   consumptionPlace:'mall',
   consumptionDate:'2019/08/01',
   consumer:'lanveer',
   createTime:'2019/07/11',
   tips:'something',
  }
]



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }

  submitData = (b)=>{
    console.log('call back data is:', b)
  };

  render() {
    return (
      <div className="account-container">
        <CommonSearchHeader formData={formData} submitData={this.submitData}/>
        <CommonSearchTable tableColumns ={tableColumns} tableData={tableData}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(Dashboard);
