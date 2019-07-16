import React, { Component } from 'react';
import { connect } from 'dva';
import {  Button, Icon, Modal, Spin, message } from 'antd';
import '.././style.scss';
import CommonSearchHeader from 'components/common-search-header';
import CommonSearchTable from 'components/common-search-table';
import CommonModal from 'components/common-modal';
import moment from 'moment/moment';
import {TIME_FOMATE} from 'constants/constant';
import {getList, addList, editeList, deleteList} from 'services/account_service'
const confirm = Modal.confirm;


// modal data
const modalData=[
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
function setDefaultValue(value, type = 'text', record = {}) {
  let renderStr = '-';
  if (!_.isNull(value) && !_.isUndefined(value)) {
    renderStr = value;
    if (type === 'date') {
      renderStr = moment(value).format(TIME_FOMATE);
    }
    else if(type === 'category'){
      renderStr= categoryTransfer(value, 'category');
    }
    else if(type==='payMethods'){
      renderStr= categoryTransfer(value, 'payMethods');
    }
  }
  return <span>{renderStr}</span>;
}

function categoryTransfer(val, flag) {
  let str='';
  let temp=[];
  if(flag === 'category') {
    modalData.map(item=>{
      if(item.dataIndex==='category'){
        temp.push(item.data);
      }
    });
    temp[0].map(i=>{
      if(i.category_code === val){
        str = i.category_name
      }
    });
  }else{
    modalData.map(item=>{
      if(item.dataIndex==='payMethods'){
        temp.push(item.data);
      }
    });
    temp[0].map(i=>{
      if(i.payMethods_code === val){
        str = i.payMethods_name
      }
    });
  }
  return str;
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
        dataIndex: 'category',
        render:(text)=>{
            return(
                setDefaultValue(text, 'category')
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
                setDefaultValue(text, 'payMethods')
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
        let consumptionDate = moment(data.consumptionDate).format('YYYY-MM-DD HH:mm:ss');
        let createTime = moment(data.createTime).format('YYYY-MM-DD HH:mm:ss');
        let params = {...data, consumptionDate, createTime};
      if(flag=== 'edit'){
        let id = this.state.openModalData.record.id;
        editeList(params, id).then(r=>{
          if(r && r.result.status === 200) {
            message.success('编辑成功');
            this.getListData()
          }else{
            message.error('编辑失败')
          }
        })

      }else if(flag==='delete'){

      }else if(flag==='add'){
        addList(params).then(r=>{
          if(r && r.result.status === 200) {
            message.success('添加成功');
            this.getListData()
          }else{
            message.error('添加失败')
          }
        })
      }
        this.setState({
            openModal:false
        });
  };


    // open modal
    openModal=(obj, flag)=>{
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
    const {openModalData,openModal,listData, isLoading} = this.state;
    return (
      <div className="account-container">
        <CommonSearchHeader formData={formData} submitData={this.submitData}/>
        <Button className="add" type="primary" onClick={()=>{this.openModal({},'add')}}><Icon type="add" />新增</Button>
        <Spin spinning={isLoading}>
          <CommonSearchTable tableColumns ={this.tableColumns} tableData={listData}/>
        </Spin>
        <CommonModal operateModal={this.operateModal} modalData={modalData} openModalData={openModalData} openModal={openModal} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(Dashboard);
