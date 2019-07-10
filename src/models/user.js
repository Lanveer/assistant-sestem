import { routerRedux } from 'dva/router';
export default {
  namespace: 'user',
  state: {
    currentUser: {
      isLoading: false,
      info: {}
    },
    loading: false,
    needVerifyCode: false
  },
  effects:{
    *loginAct({payload }, {call, put}){
      yield put(routerRedux.replace('/pwd'));
    },
    *logoutAct({payload }, {call, put}){
      yield put(routerRedux.replace('/user/login'));
    },
  },

};
