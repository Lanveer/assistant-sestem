import React, { Component } from 'react';
import { connect } from 'dva';
import {  Button, Icon, Modal, Spin, message } from 'antd';
import './style.scss';
import CommonSearchHeader from 'components/common-search-header';
import CommonSearchTable from 'components/common-search-table';
import CommonModal from 'components/common-modal';
import moment from 'moment/moment';
import {TIME_FOMATE} from 'constants/constant';
import {getList, addList, editeList, deleteList} from 'services/book_service'
import {search} from 'services/search'
const confirm = Modal.confirm;


// modal data
const modalData=[
  {
    title: '书名',
    dataIndex: 'name',
    required:true,
    errMsg:'请输入书名',
    type:'input'
  },
  {
    title: '作者',
    dataIndex: 'author',
    required:true,
    errMsg:'请输入作者',
    type:'input'
  },
  {
    title: '出版社',
    dataIndex: 'publish',
    required:true,
    errMsg:'请输入出版社',
    type:'input'
  },
  {
    title: '内容描述',
    dataIndex: 'content',
    required:true,
    errMsg:'请输入书籍内容描述',
    type:'input'
  },
  {
    title: '书籍状态',
    dataIndex: 'book_status',
    required:true,
    errMsg:'请输入书籍状态',
    type:'input'
  },{
    title: '种类',
    dataIndex: 'category',
    required:true,
    errMsg:'请选择种类',
    type:'select',
    data:[
      {
        category_id:1,
        category_name:'小说',
        category_code:'fids',
      },
      {
        category_id:2,
        category_name:'工具书',
        category_code:'tool_books',
      },
      {
        category_id:3,
        category_name:'文学',
        category_code:'art',
      },
      {
        category_id:4,
        category_name:'英语',
        category_code:'english',
      },
      {
        category_id:5,
        category_name:'法语',
        category_code:'french',
      },
      {
        category_id:6,
        category_name:'德语',
        category_code:'genmany',
      },
      {
        category_id:7,
        category_name:'其他',
        category_code:'other',
      }
    ]
  },
  {
    title: '封面',
    dataIndex: 'cover',
    required:true,
    errMsg:'请上传封面',
    type:'file'
  },
  {
    title: '来源',
    dataIndex: 'origin',
    required:true,
    errMsg:'请输入来源',
    type:'input'
  },
  {
    title: '价格',
    dataIndex: 'price',
    required:true,
    errMsg:'请输入价格',
    type:'input'
  },
  {
    title: '录入人',
    dataIndex: 'recorder',
    required:true,
    errMsg:'请输入录入人',
    type:'input',
  },
  {
    title: '备注',
    dataIndex: 'tips',
    required:true,
    errMsg:'请输入备注',
    type:'input',
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
    name:'书名',
    code:'name',
    value:true,
    required:true,
    placeholder:'请输入书名',
    errMsg:'请输入需要查询的名称'
  },
  {
    name:'内容',
    code:'content',
    value:true,
    required:false,
    placeholder:'请输入关于书本的内容',
    errMsg:'请输入需要查询的名称'
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
        dataIndex: 'idx',
        render:(text)=>{
            return(
                setDefaultValue(text)
            )
        }
    },
    {
        title: '书名',
        dataIndex: 'name',
        render:(text)=>{
            return(
                setDefaultValue(text)
            )
        }
    },
    {
        title: '作者',
        dataIndex: 'author',
        render:(text)=>{
            return(
                setDefaultValue(text)
            )
        }
    },
    {
      title: '书籍状态',
      dataIndex: 'book_status',
      render:(text)=>{
        return(
          setDefaultValue(text)
        )
      }
    },
    {
      title: '出版社',
      dataIndex: 'publish',
      render:(text)=>{
        return(
          setDefaultValue(text)
        )
      }
    },
    {
      title: '内容简介',
      dataIndex: 'content',
      render:(text)=>{
        return(
          setDefaultValue(text)
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render:(text)=>{
        return(
          setDefaultValue(text, 'date')
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
      title: '封面',
      dataIndex: 'cover',
      render:(text)=>{
        return(
          // setDefaultValue(text)
          <img src={text} alt="fengmian "/>
        )
      }
    },
    {
        title: '来源',
        dataIndex: 'origin',
        render:(text)=>{
            return(
                setDefaultValue(text)
            )
        }
    },
    {
        title: '价格',
        dataIndex: 'price',
        render:(text)=>{
            return(
                setDefaultValue(text)
            )
        }
    },
    {
        title: '录入人',
        dataIndex: 'recorder',
        render:(text)=>{
            return(
                setDefaultValue(text )
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
              console.log('list data is:', r);
                this.setState({
                    listData:r.result,
                    isLoading:false
                })
            }
        });
    };
  submitData = (b)=>{
    this.setState({
      isLoading:true
    });
    search(b, 'account_list').then(r=>{
      if(r && r.result.status === 200) {
        this.setState({
          listData:r.result,
          isLoading:false
        })
      }
    })
  };
  resetForm=()=>{
    this.getListData()
  };
    // modal 点击事件
    operateModal = (data, flag)=>{
        let create_time = moment(data.create_time).format('YYYY-MM-DD HH:mm:ss');
        let params = {...data, create_time};
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
            okText:'确定',
            cancelText:'取消',
            title: `确定要删除名称为${record.item}的数据`,
            content: '删除后可以在数据库备份中找回',
            onOk() {
              deleteList(record.id).then(r=>{
                if(r && r.result.status === 200) {
                  message.success('删除成功');
                  that.getListData()
                }else{
                  message.error('删除失败')
                }
              })
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
        <CommonSearchHeader formData={formData} submitData={this.submitData} resetForm={this.resetForm}/>
        <Button className="add" type="primary" onClick={()=>{this.openModal({},'add')}}><Icon type="add" />新增</Button>
        <Spin spinning={isLoading}>
          <CommonSearchTable tableColumns ={this.tableColumns} tableData={listData} x={1800}/>
        </Spin>
        {
          openModal ?

            <CommonModal operateModal={this.operateModal} modalData={modalData} openModalData={openModalData} openModal={openModal} />

            :
            null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(Dashboard);
