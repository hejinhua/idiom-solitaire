/*
 * @Author: hjh
 * @Date: 2021-11-16 11:31:53
 * @Description: 通用 utils
 */
import Taro from '@tarojs/taro'

export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url
}
export const pageToLogin = () => {
  let path = getCurrentPageUrl()
  if (!path.includes('login')) {
    Taro.navigateTo({
      url: '/pages/login/login'
    })
  }
}

export const showToast = (title, icon = 'none') => {
  Taro.showToast({
    title,
    icon,
    duaring: 800
  })
}

export const isMobile = mobile => /^1[3-9]\d{9}$/.test(mobile)
