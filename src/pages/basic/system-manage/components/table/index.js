import React, {PureComponent} from 'react';
import { Form, Icon, Row, Col, Select, Input, Button, } from 'antd';
const Option = Select.Option;
import  TestHOC  from '../hoc/table'
@Form.create()
@TestHOC
 class ProjectProperty extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {

  }

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    return (
      <div className="sys-wrapper">
        <h1>{this.props.name}</h1>
      </div>
    );
  }
}

export default ProjectProperty;