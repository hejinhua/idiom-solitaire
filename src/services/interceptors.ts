/*
 * @Author: hjh
 * @Date: 2021-11-16 14:59:43
 * @Description: 拦截器
 */
import Taro from '@tarojs/taro'
import { pageToLogin, showToast } from '../utils/utils'
import { CUSTOM_STATUS, HTTP_STATUS } from './status'

const customInterceptor = chain => {
  const requestParams = chain.requestParams

  return chain.proceed(requestParams).then(res => {
    const { statusCode } = res
    if (statusCode === HTTP_STATUS.NOT_FOUND) {
      return Promise.reject('请求资源不存在')
    } else if (statusCode === HTTP_STATUS.BAD_GATEWAY) {
      return Promise.reject('服务端出现了问题')
    } else if (statusCode === HTTP_STATUS.FORBIDDEN) {
      Taro.removeStorageSync('token')
      pageToLogin()
      return Promise.reject('没有权限访问')
    } else if (statusCode === HTTP_STATUS.AUTHENTICATE) {
      Taro.setStorageSync('Authorization', '')
      pageToLogin()
      return Promise.reject('需要鉴权')
    } else if (statusCode === HTTP_STATUS.SUCCESS) {
      const { code, msg } = res.data || {}
      if (code === CUSTOM_STATUS.SUCCESS) {
        return res.data
      } else if (code === CUSTOM_STATUS.AUTH_REVIEWING) {
        Taro.navigateTo({
          url: '/pages/review/index?result=reviewing'
        })
      } else if (code === CUSTOM_STATUS.AUTH_REFUSE) {
        Taro.navigateTo({
          url: '/pages/review/index?result=refuse'
        })
      } else {
        showToast(msg, () => {
          if (code === CUSTOM_STATUS.AUTHENTICATE) {
            pageToLogin()
          }
        })
      }
    }
  })
}

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
// @ts-ignore
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]

export default interceptors
