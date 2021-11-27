export default {
  pages: [
    'pages/index/index',
    'pages/login/index',
    'pages/register/index',
    'pages/material/index',
    'pages/search/index',
    'pages/mine/index',
    'pages/review/index',
    'pages/about/index',
    'pages/dishDetail/index',
    'pages/materialDetail/index',
    'pages/order/index',
    'pages/supplier/index'
  ],
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页'
      },
      {
        pagePath: 'pages/material/index',
        text: '原料'
      },
      {
        pagePath: 'pages/search/index',
        text: '搜索'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
