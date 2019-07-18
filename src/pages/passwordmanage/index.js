import React, { Component } from 'react';
import OrderSearchHeader from './password-search-header';
import OrderSearchResult from './password-search-result/';
import { connect } from 'dva';
import './style.scss';
@connect(state => ({
}))
export default class OrderSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData:[]
    };
  }

  handleSubmitSearch(searchData) {
    searchData:searchData
  }

  onRef=(ref)=>{
    this.OrderSearchResult=ref;
  };
  render() {
    const {searchData} = this.state;
    console.log('searchData :',searchData);
    return (
      <div className="order-search-container">
        <OrderSearchHeader
          handleSubmitSearch={this.handleSubmitSearch}
          handleAddItem={()=>{this.OrderSearchResult.openModal && this.OrderSearchResult.openModal()}}
        />
        <OrderSearchResult
          searchData={searchData}
          onRef={this.onRef}
        />
      </div>
    );
  }
}
