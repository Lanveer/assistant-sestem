import React, { Component } from 'react';
import moment from 'moment';
export default class CreditApprovedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowDate: +moment()
    };
  }

  componentDidMount() {
  }
  render() {
    return (
      <div>
        <h1>贷后管理: {this.state.nowDate}</h1>
      </div>
    );
  }
}
