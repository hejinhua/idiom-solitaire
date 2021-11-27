/*
 * @Author: hjh
 * @Date: 2021-11-16 11:31:53
 * @Description: 通用 utils
 */
import { tabbarUrlList } from '@/constants/constants'
import { getServicePhone } from '@/services/api'
import Taro from '@tarojs/taro'
import { getGlobalData, setGlobalData } from './global-data'

export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url
}
export const toPage = (url: string, redirect?: boolean) => {
  if (tabbarUrlList.some(item => url.includes(item))) {
    Taro.switchTab({ url })
  } else {
    redirect ? Taro.redirectTo({ url }) : Taro.navigateTo({ url })
  }
}
export const pageToLogin = () => {
  let path = getCurrentPageUrl()
  if (!path.includes('login')) {
    Taro.removeStorageSync('token')
    Taro.removeStorageSync('userInfo')
    Taro.reLaunch({
      url: '/pages/login/index'
    })
  }
}

export const showToast = (title, callback?) => {
  Taro.showToast({
    title,
    icon: 'none',
    success() {
      callback && callback()
    }
  })
}

export const isMobile = mobile => /^1[3-9]\d{9}$/.test(mobile)

export const formatPrice = price => {
  let decimal = price.toString().split('.')[1]
  return decimal?.length >= 1 ? price : price + '.0'
}
export const customerService = () => {
  const servicePhone = getGlobalData('servicePhone')
  if (servicePhone) {
    Taro.makePhoneCall({
      phoneNumber: servicePhone
    })
  } else {
    getServicePhone().then(res => {
      setGlobalData('servicePhone', res?.data)
      Taro.makePhoneCall({
        phoneNumber: res?.data
      })
    })
  }
}

/**
 * @description: 缓存栈
 * @param {string} listName
 * @param {number} listLength
 * @param {any} data
 * @return {array} list
 */
export const setStack = (listName: string, listLength: number, data) => {
  let list = Taro.getStorageSync(listName)
  if (list) {
    let index = list.findIndex(item => item === data)
    if (index !== -1) {
      list.splice(index, 1)
    }
    list.unshift(data)
    let len = list.length
    if (len > listLength) {
      list.splice(listLength, len - listLength)
    }
  } else {
    list = [data]
  }
  Taro.setStorageSync(listName, list)
  return list
}
