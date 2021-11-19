/*
 * @Author: hjh
 * @Date: 2021-11-16 11:27:46
 * @Description: globalData
 */

const globalData = {}

const setGlobalData = (key: string, val: any) => {
  globalData[key] = val
}

const getGlobalData = (key: string) => {
  return globalData[key]
}

export { setGlobalData, getGlobalData }
