/*
 * @Author: hjh
 * @Date: 2021-11-16 14:59:43
 * @Description: 拦截器
 */
import Taro from '@tarojs/taro'
import { pageToLogin } from '../utils/utils'
import { HTTP_STATUS } from './status'

const customInterceptor = chain => {
  const requestParams = chain.requestParams

  return chain.proceed(requestParams).then(res => {
    if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
      return Promise.reject('请求资源不存在')
    } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
      return Promise.reject('服务端出现了问题')
    } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
      Taro.setStorageSync('Authorization', '')
      pageToLogin()
      // TODO 根据自身业务修改
      return Promise.reject('没有权限访问')
    } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
      Taro.setStorageSync('Authorization', '')
      pageToLogin()
      return Promise.reject('需要鉴权')
    } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
      return res.data
    }
  })
}

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
// @ts-ignore
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]

export default interceptors
