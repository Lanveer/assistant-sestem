import { dynamicWrapper } from 'utils/core';

export default app => [
  {
    component: dynamicWrapper(app, ['user'], () => import('layouts/basic')),
    layout: 'basic',
    children: [
      {
        path: 'search',
        component: dynamicWrapper(app, [], () =>
          import('pages/passwordmanage')
        )
      },
      {
        name: '信息板',
        path: 'dashboard',
        component: dynamicWrapper(app, [], () =>
          import('pages/basic/dashboard')
        )
      },
      {
        name: '审批中心',
        path: '/newApprovelCenter',
        exact: true,
        component: dynamicWrapper(app, [], () =>
          import('pages/basic/new-approvel-center')
        )
      },
      {
        name: '支用审核',
        path: '/newApprovelCenter/approvedList',
        exact: true,
        component: dynamicWrapper(app, [], () =>
          import('pages/basic/new-approvel-center/credit-approved-list')
        )
      },
      {
        name: '支用查询',
        path: '/newApprovelCenter/supportQuery',
        exact: true,
        component: dynamicWrapper(app, [], () =>
          import('pages/basic/new-approvel-center/support-query')
        )
      },
      {
        name: '授信审核',
        path: '/newApprovelCenter/sx-approvedList',
        exact: true,
        component: dynamicWrapper(app, [], () =>
          import('pages/basic/new-approvel-center/sx-approved-list')
        )
      },
      {
        name: '授信查询',
        path: '/newApprovelCenter/creditInquiry',
        exact: true,
        component: dynamicWrapper(app, [], () =>
          import('pages/basic/new-approvel-center/credit-inquiry')
        )
      },
      {
        name: '审批中心(供应链)',
        path: '/approvelCenter',
        exact: true,
        component: dynamicWrapper(app, [], () =>
          import('pages/basic/approvel-center')
        )
      },
      {
        name: '档案管理',
        path: '/fileManage',
        exact: true,
        component: dynamicWrapper(app, [], () =>
          import('pages/basic/file-manage')
        )
      },
      {
        name: '消息提示',
        path: '/fileManage/tipManage',
        exact: true,
        component: dynamicWrapper(
          app,
          ['params-manage', 'register-to-db', 'tip-manage'],
          () => import('pages/basic/file-manage/tipManage')
        )
      },
      {
        name: '访问拒绝',
        path: '/403',
        exact: true,
        component: dynamicWrapper(app, [], () => import('pages/basic/403'))
      },
      {
        name: '贷后管理',
        path: '/postLoan',
        exact: true,
        component: dynamicWrapper(app, [], () =>
          import('pages/basic/post_loan')
        )
      },
      {
        name: '系统管理',
        path: '/setting',
        exact: true,
        component: dynamicWrapper(app, [], () => import('pages/basic/setting'))
      }, {
        name: '系统管理',
        path: '/systemManage',
        exact: true,
        component: dynamicWrapper(app, [], () => import('pages/basic/system-manage'))
      }
    ]
  },
  {
    component: dynamicWrapper(app, [], () => import('layouts/user')),
    layout: 'user',
    children: [
      {
        name: '用户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登陆',
            path: 'login',
            component: dynamicWrapper(app, ['user'], () =>
              import('pages/user/login')
            )
          }
        ]
      }
    ]
  }
];
