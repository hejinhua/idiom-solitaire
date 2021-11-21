/*
 * @Author: hjh
 * @Date: 2021-11-16 11:27:46
 * @Description: globalData
 */
import Taro from '@tarojs/taro'

const globalData = {
  capsuleInfo: Taro.getMenuButtonBoundingClientRect(), // 右上角胶囊按钮布局信息
  systemInfo: Taro.getSystemInfoSync()
}

const setGlobalData = (key: string, val: any) => {
  globalData[key] = val
}

const getGlobalData = (key: string) => {
  return globalData[key]
}

export { setGlobalData, getGlobalData }
