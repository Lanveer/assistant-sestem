import React, {PureComponent} from 'react';
const  TestHOC = (WrappedComponent) =>{
  return class extends PureComponent {
    constructor(){
      super()
      this.state={
        name:'what'
      }
    }

    componentWillMount() {
      this.start = Date.now();
    }
    componentDidMount() {
      this.end = Date.now();
      console.log(`渲染时间：${this.end - this.start} ms`);
    }
    componentWillUnmount() {

    }
    render() {
      const { visible, ...props } = this.props;
      const {name} = this.state;
      if (visible === false) return null;
      return (
        <div>
          <h1>hello</h1>
          <WrappedComponent {...props} name ={name} />
        </div>
      )
    }
  }
};


export default TestHOC;





