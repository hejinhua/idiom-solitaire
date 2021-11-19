/*
 * @Author: hjh
 * @Date: 2021-11-19 10:50:06
 * @Description: loading计数
 */
import Taro from '@tarojs/taro'

let reqNum = 0

export const startLoading = () => {
  if (reqNum === 0) {
    Taro.showLoading({
      title: '加载中'
    })
  }
  reqNum++
}

export const endLoading = () => {
  if (reqNum <= 0) return
  reqNum--
  if (reqNum === 0) {
    Taro.hideLoading()
  }
}
