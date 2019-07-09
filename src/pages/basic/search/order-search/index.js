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
  handleSubmitSearch(conditions) {
  }





  render() {
    return (
      <div className="order-search-container">
        <OrderSearchHeader
          handleSubmitSearch={this.handleSubmitSearch}
        />
        <OrderSearchResult
          handleSubmitSearch={this.handleSubmitSearch}
        />
      </div>
    );
  }
}
