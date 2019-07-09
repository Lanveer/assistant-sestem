import React, {PureComponent} from 'react';
import {getMenus, addMenus, forbidMenus} from 'services/sys-manage';
import FirstStep from './new-project'
import SecondStep from './project-configs'


export default class SystemManage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showSteps:true,
      // showSteps:false,
      proInfos:{}
    };
  }
  componentDidMount() {

  }
  nextStep = (e)=>{
    // console.log('go on data is:', e);
    this.setState({
      showSteps:e.isNew,
      proInfos:e
    })
  };

  render() {
    const {showSteps,proInfos} = this.state;
    return (
     <div>
       {
         showSteps ? <SecondStep proInfos={proInfos} nextStep ={this.nextStep.bind(this)}/> : <FirstStep nextStep ={this.nextStep.bind(this)}/>
       }
     </div>
    );
  }
}




