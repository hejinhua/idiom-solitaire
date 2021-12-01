export default {
  pages: [
    'pages/index/index',
    'pages/dish/index',
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
    color: '#666',
    selectedColor: '#E55353',
    list: [
      {
        pagePath: 'pages/dish/index',
        text: '菜单',
        iconPath: 'assets/icons/tabbar/dish.png',
        selectedIconPath: 'assets/icons/tabbar/dish-sel.png'
      },
      {
        pagePath: 'pages/material/index',
        text: '原料',
        iconPath: 'assets/icons/tabbar/material.png',
        selectedIconPath: 'assets/icons/tabbar/material-sel.png'
      },
      {
        pagePath: 'pages/search/index',
        text: '搜索',
        iconPath: 'assets/icons/tabbar/search.png',
        selectedIconPath: 'assets/icons/tabbar/search-sel.png'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'assets/icons/tabbar/mine.png',
        selectedIconPath: 'assets/icons/tabbar/mine-sel.png'
      }
    ]
  },
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black'
  }
}
