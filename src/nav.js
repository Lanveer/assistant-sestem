import { dynamicWrapper } from 'utils/core';

export default app => [
  {
    component: dynamicWrapper(app, ['user'], () => import('layouts/basic')),
    layout: 'basic',
    children: [
      {
        path: 'passwordManage',
        component: dynamicWrapper(app, [], () =>
          import('pages/passwordmanage')
        )
      },
      {
        name: '信息',
        path: 'dashboard',
        component: dynamicWrapper(app, [], () =>
          import('pages/basic/dashboard')
        )
      },
      {
        name: '审批',
        path: '/newApprovelCenter',
        exact: true,
        component: dynamicWrapper(app, [], () =>
          import('pages/basic/new-approvel-center')
        )
      },
      {
        name: '审核',
        path: '/newApprovelCenter/approvedList',
        exact: true,
        component: dynamicWrapper(app, [], () =>
          import('pages/basic/new-approvel-center/credit-approved-list')
        )
      },
      {
        name: '查询',
        path: '/newApprovelCenter/supportQuery',
        exact: true,
        component: dynamicWrapper(app, [], () =>
          import('pages/basic/new-approvel-center/support-query')
        )
      },
      {
        name: '授得到',
        path: '/newApprovelCenter/sx-approvedList',
        exact: true,
        component: dynamicWrapper(app, [], () =>
          import('pages/basic/new-approvel-center/sx-approved-list')
        )
      },
      {
        name: '額額外',
        path: '/newApprovelCenter/creditInquiry',
        exact: true,
        component: dynamicWrapper(app, [], () =>
          import('pages/basic/new-approvel-center/credit-inquiry')
        )
      },
      {
        name: '熱風而非',
        path: '/approvelCenter',
        exact: true,
        component: dynamicWrapper(app, [], () =>
          import('pages/basic/approvel-center')
        )
      },
      {
        name: '為惡',
        path: '/fileManage',
        exact: true,
        component: dynamicWrapper(app, [], () =>
          import('pages/basic/file-manage')
        )
      },
      {
        name: '而無法',
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
        name: '額外熱舞',
        path: '/postLoan',
        exact: true,
        component: dynamicWrapper(app, [], () =>
          import('pages/basic/post_loan')
        )
      },
      {
        name: '為惡的',
        path: '/setting',
        exact: true,
        component: dynamicWrapper(app, [], () => import('pages/basic/setting'))
      }, {
        name: '為惡的',
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
