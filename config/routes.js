export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/feature-services',
    name: 'feature-services',
    icon: 'table',
    component: './FeatureServices',
    // routes: [
    //   {
    //     path: '/feature-services/mapbox',
    //     name: 'tile-map',
    //     component: './MapBox',
    //   },
    // ],
  },
  {
    path: '/function-services',
    name: 'function-services',
    icon: 'function',
    access: 'canAdmin',
    component: './FunctionServices', // routes: [
    //   {
    //     path: '/admin/sub-page',
    //     name: 'sub-page',
    //     icon: 'smile',
    //     component: './FeatureServices',
    //   },
    //   {
    //     component: './404',
    //   },
    // ],
  },
  {
    name: 'publish-services',
    icon: 'rise',
    path: '/publish-services',
    component: './PublishServices',
  },
  {
    name: 'create-func-services',
    icon: 'highlight',
    path: '/create-func-services',
    component: './CreateFunctionServices',
  },
  {
    path: '/',
    redirect: '/feature-services',
  },
  {
    name: '卡片列表',
    icon: 'smile',
    path: '/~docs/components/listcardlist',
    component: './ListCardList',
  },
  {
    component: './404',
  },
];
