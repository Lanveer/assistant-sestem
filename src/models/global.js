

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
      });
    }
  }
};
