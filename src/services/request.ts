/*
 * @Author: hjh
 * @Date: 2021-11-16 11:35:46
 * @Description: request 封装
 */

import Taro from '@tarojs/taro'
import { endLoading, startLoading } from '@/utils/loadingUtil'
import getBaseUrl from './baseUrl'
import interceptors from './interceptors'

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

type OptionType = {
  url: string
  data: object
  method?: any
  header: object
}

class httpRequest {
  baseOptions(params, method = 'GET') {
    let { url, data, loading = true } = params
    const BASE_URL = getBaseUrl()
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    const option: OptionType = {
      url: BASE_URL + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        Authorization: Taro.getStorageSync('Authorization')
      }
    }
    return Taro.request(option)
      .then(res => {
        loading && startLoading()
        return res
      })
      .catch(() => {
        endLoading()
      })
  }

  get(url, data, loading) {
    let option = { url, data, loading }
    return this.baseOptions(option)
  }

  post(url, data, contentType, loading) {
    let params = { url, data, contentType, loading }
    return this.baseOptions(params, 'POST')
  }

  put(url, data, loading) {
    let option = { url, data, loading }
    return this.baseOptions(option, 'PUT')
  }

  delete(url, data, loading) {
    let option = { url, data, loading }
    return this.baseOptions(option, 'DELETE')
  }
}

export default new httpRequest()
