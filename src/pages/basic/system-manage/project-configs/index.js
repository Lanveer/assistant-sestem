import React, {PureComponent} from 'react';
import { Tabs, Button  } from 'antd';
const TabPane = Tabs.TabPane;
import './second.scss';
import ProjectProperty from '../project-properties';
import ProjectProcess from '../project-process';
import ProjectThird from '../project-thirdData';
import ProjectDictionary from '../project-dictionary';
import Tables from '../components/table'
let tabBarStyle = {
  width:'300px'
};
export default class FirstStep extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {

  }

  render() {
    const {proInfos} = this.props;
    return (
      <div className="sys-wrapper">
        <Tabs defaultActiveKey="1" tabPosition ='left' tabBarStyle={tabBarStyle} type='line'>
          <TabPane tab={<span>*项目属性</span>}  key="1">
            {/*<ProjectProperty proInfos={proInfos}/>*/}
            <Tables/>
          </TabPane>
          <TabPane tab={<span>*流程</span>} key="2">
            <ProjectProcess/>
          </TabPane>
          <TabPane tab={<span>*字置</span>} key="3">
            <ProjectDictionary/>
          </TabPane>
          <TabPane tab={<span>三示</span>} key="4">
            <ProjectThird/>
          </TabPane>
          <TabPane tab={<span>*审块</span>} key="5">Content of Tab Pane 2</TabPane>
          <TabPane tab={<span>*Poly预配置</span>} key="6">Content of Tab Pane 2</TabPane>
        </Tabs>
        {/*<div className='next-step'>*/}
          {/*<Button type="primary" disabled = {false} >保存</Button>*/}
        {/*</div>*/}
      </div>
    );
  }
}


