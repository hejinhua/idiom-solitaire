/*
 * @Author: hjh
 * @Date: 2021-11-16 11:35:46
 * @Description: request 封装
 */

import Taro from '@tarojs/taro'
import { endLoading, startLoading } from '@/utils/loading-util'
import interceptors from './interceptors'
import { baseUrl } from './baseUrl'

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
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    const option: OptionType = {
      url: baseUrl + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        Authorization: Taro.getStorageSync('token')
      }
    }
    loading && startLoading()
    return Taro.request(option)
      .then((res: any) => {
        endLoading()
        return res
      })
      .catch(() => {
        endLoading()
      })
  }

  get(url, data?, loading?) {
    let option = { url, data, loading }
    return this.baseOptions(option)
  }

  post(url, data, contentType?, loading?) {
    let params = { url, data, contentType, loading }
    return this.baseOptions(params, 'POST')
  }

  put(url, data, loading?) {
    let option = { url, data, loading }
    return this.baseOptions(option, 'PUT')
  }

  delete(url, data, loading?) {
    let option = { url, data, loading }
    return this.baseOptions(option, 'DELETE')
  }
}

export default new httpRequest()
