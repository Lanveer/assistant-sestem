import { routerRedux } from 'dva/router';
import {login} from 'services/login'
export default {
  namespace: 'user',
  state: {
    currentUser:''
  },
  effects:{
    *loginAct({payload, callback }, {call, put}){
      const loginRes = yield call(login, {user:payload.user, password:payload.password});
      if(loginRes && loginRes.result.status===200) {
        callback('登录成功');
        localStorage.setItem('user',loginRes.result.data);
        yield put(routerRedux.replace('/passwordManage'));
        yield put({
          type: 'loginSuccess',
          payload: loginRes.result.data
        });

      }else{
        callback('登录失败');
        yield put(routerRedux.replace('/user/login'));
      }

      return false;

    },
    *logoutAct({payload }, {call, put}){
      yield put(routerRedux.replace('/user/login'));
    },
  },
  reducers: {
    loginSuccess(state, action) {
      return {
        ...state,
        currentUser: action.payload
      };
    },
  }

};
