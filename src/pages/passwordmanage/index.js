import React, { Component } from 'react';
import OrderSearchHeader from './order-search-header';
import OrderSearchResult from './order-search-result/';
import { connect } from 'dva';
import './style.scss';

@connect(state => ({
}))
export default class OrderSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  onRef=(ref)=>{
    this.OrderSearchResult=ref;
  };
  render() {
    const {} = this.state;
    return (
      <div className="order-search-container">

        <OrderSearchHeader
          handleSubmitSearch={this.handleSubmitSearch}
          handleAddItem={()=>{this.OrderSearchResult.openModal && this.OrderSearchResult.openModal()}}
        />
        <OrderSearchResult
          handleSubmitSearch={this.handleSubmitSearch}
          onRef={this.onRef}
        />
      </div>
    );
  }
}
