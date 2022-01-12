/*
 * @Author: hjh
 * @Date: 2022-01-11 16:23:41
 * @Description: 调用云函数统一入口
 */
import { endLoading, startLoading } from '@/utils/loading-util'
import Taro from '@tarojs/taro'

type paramsType = {
  name: string
  data?: Object
}
export const cloudFunction = (params: paramsType) => {
  startLoading()
  return Taro.cloud
    .callFunction(params)
    .then(res => {
      endLoading()
      return res.result
    })
    .catch(err => {
      endLoading()
      throw err
    })
}
