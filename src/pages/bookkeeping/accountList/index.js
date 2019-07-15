import React, { Component } from 'react';
import { connect } from 'dva';
import {  Button, Icon, Modal } from 'antd';
import '.././style.scss';
import CommonSearchHeader from 'components/common-search-header';
import CommonSearchTable from 'components/common-search-table';
import CommonModal from 'components/common-modal';
import moment from 'moment/moment';
import {TIME_FOMATE} from 'constants/constant';
import {getList, addList, editeList, deleteList} from 'services/account_service'
const confirm = Modal.confirm;
function setDefaultValue(value, type = 'text', record = {}) {
  let renderStr = '-';
  if (!_.isNull(value) && !_.isUndefined(value)) {
    renderStr = value;
    if (type === 'date') {
      renderStr = moment(value).format(TIME_FOMATE);
    }
  }
  return <span>{renderStr}</span>;
}

// search-header data
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


// mock data
const tableData=[
  {
   id:1,
   item:'eating',
   category:'eating',
   num:100,
   payMethods:'ant_pay',
   consumptionPlace:'mall',
   consumptionDate:'2019/08/01',
   consumer:'lanveer',
   createTime:'2019/07/11',
   tips:'something',
      operate:'eweewew'
  }
];




class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        openModalData:{},
        openModal:false,
        page:1,
        pagesize:10,
        isLoading:false,
        listData:{},
    };
  }

  // table data
  tableColumns=[
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
        dataIndex: 'catergory',
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
                setDefaultValue(text , 'date')
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
                setDefaultValue(text, 'date')
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
        render:(record,text)=>{
            return (
                <div className="operate">
                  <Button className="edit" type="primary" onClick={()=>{this.openModal(text, 'edit')}}><Icon type="edit" />编辑</Button>
                  <Button className="delete" type="danger" onClick={()=>{this.delete(text,'delete')}}><Icon type="delete" />删除</Button>
                </div>
            )
        }
    },
];

  // modal data
  modalData=[
    {
      title: '条目',
      dataIndex: 'item',
      required:true,
      errMsg:'请输入条目',
      type:'input'
    },
    {
      title: '种类',
      dataIndex: 'category',
      required:true,
      errMsg:'请选择种类',
      type:'select',
      data:[
        {
          category_id:1,
          category_name:'吃饭',
          category_code:'eating',
        },
        {
          category_id:2,
          category_name:'穿着',
          category_code:'clothing',
        },
        {
          category_id:3,
          category_name:'交通',
          category_code:'transport',
        }
      ]
    },
    {
      title: '金额',
      dataIndex: 'num',
      required:true,
      errMsg:'请输入金额',
      type:'input'
    },
    {
      title: '支付方式',
      dataIndex: 'payMethods',
      required:true,
      errMsg:'请选择支付方式',
      type:'select',
      data:[
        {
          payMethods_id:1,
          payMethods_name:'微信',
          payMethods_code:'weixiPay',
        },
        {
          payMethods_id:2,
          payMethods_name:'支付宝',
          payMethods_code:'aliPay',
        },
        {
          payMethods_id:3,
          payMethods_name:'现金',
          payMethods_code:'cash',
        }
      ]
    },
    {
      title: '消费地点',
      dataIndex: 'consumptionPlace',
      required:true,
      errMsg:'请输入消费地点',
      type:'input'
    },
    {
      title: '消费时间',
      dataIndex: 'consumptionDate',
      required:true,
      errMsg:'请选择消费时间',
      type:'date'
    },
    {
      title: '消费者',
      dataIndex: 'consumer',
      required:true,
      errMsg:'请输入消费者',
      type:'input'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      required:true,
      errMsg:'请选择创建时间',
      type:'date'
    },
    {
      title: '备注',
      dataIndex: 'tips',
      required:true,
      errMsg:'请输入tips',
      type:'input'
    },
  ];


  componentDidMount() {
      const {page, pagesize} = this.state;
      this.getListData(page, pagesize);
  }
    // get list data
    getListData = (page=1, pagesize=10)=>{
        this.setState({
            isLoading:true
        });
        const pms = {
            page,
            pagesize,
            credentials:'include'
        };
        getList(pms).then(r=>{
            if(r && r.result.status === 200) {
                console.log('r is:', r.result);
                this.setState({
                    listData:r.result,
                    isLoading:false
                })
            }
        });
    };
  submitData = (b)=>{
    console.log('call back data is:', b)
  };

    // modal 点击事件
    operateModal = (data, flag)=>{
        console.log('data is:', data);
      if(flag=== 'edit'){

      }else if(flag==='delete'){


      }else if(flag==='add'){

      }
        this.setState({
            openModal:false
        });
    // console.log('operateModal back data is:', b)
  };


    // open modal
    openModal=(obj, flag)=>{
      console.log('obj is:', obj);
      let modalParams={};
      modalParams.record= obj,
      modalParams.flag= flag;
        this.setState({
            openModalData:modalParams,
            openModal:true
        })
    };

    // delete
    delete = (record)=>{
        let that = this;
        confirm({
            title: `确定要删除名称为${record.item}的数据`,
            content: '删除后可以在数据库备份中找回',
            onOk() {
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    };
  render() {
    const {openModalData,openModal,listData} = this.state;
    return (
      <div className="account-container">
        <CommonSearchHeader formData={formData} submitData={this.submitData}/>
        <Button className="add" type="primary" onClick={()=>{this.openModal({},'add')}}><Icon type="add" />新增</Button>
        <CommonSearchTable tableColumns ={this.tableColumns} tableData={listData}/>
        <CommonModal openModalData={openModalData} openModal={openModal} operateModal={this.operateModal} modalData={this.modalData}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(Dashboard);
