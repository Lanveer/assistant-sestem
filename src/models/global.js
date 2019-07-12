
import { routerRedux } from 'dva/router';
export default {
  namespace: 'global',
  state: {
    selectedKeys: 'search',
    userMenu: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(location => {
        const pathname = location.pathname.split('/');
        let key = pathname[1];
        console.log('key is:', key)
        if (key !== '') {
          console.log('here');
          // dispatch({
          //   type: 'watchRouteChangeAct',
          //   payload: {
          //     selectedKeys: key
          //   }
          // });
        }else{
          console.log('there')
          dispatch({
            type: 'watchRouteChangeAct',
            payload: {
              selectedKeys: key
            }
          });
        }
      });
    }
  },
  effects: {
    *watchRouteChangeAct({ payload }, { call, put }) {
      yield put(routerRedux.replace('/user/login'));
    }
  },
  reducers: {
  }
};
