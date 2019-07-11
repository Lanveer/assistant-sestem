import React, { Component } from 'react';
import { connect } from 'dva';
import {  Button } from 'antd';
import '.././style.scss';
import CommonSearchHeader from 'components/common-search-header';



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
    };
  }
  componentDidMount() {

  }


  render() {
    return (
      <div className="account-container">
        <CommonSearchHeader formData={formData}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(Dashboard);
