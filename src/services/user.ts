/*
 * @Author: hjh
 * @Date: 2021-11-20 16:36:13
 * @Description: 用户登录 api
 */

import { getGlobalData, setGlobalData } from '@/utils/global-data'
import { endLoading, startLoading } from '@/utils/loading-util'
import Taro from '@tarojs/taro'
import JSEncrypt from 'jsencrypt'
import httpRequest from './request'

const PUBLICK_KEY =
  'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALbGzsSXmWQ+LuVlyCzAEdarqaNt8l0e3f22bYFJi6VAoWD3+Ab/iNrqYkzATQ8ow0w9rlLmVaQ9TLZ8wZUtEm0CAwEAAQ=='

// 公钥加密
const encryptPassword = text => {
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(PUBLICK_KEY)
  return encrypt.encrypt(text)
}

export const login = data => {
  data.password = encryptPassword(data.password)
  return httpRequest.post('customer/login', data)
}
export const register = data => {
  data.password = encryptPassword(data.password)
  return httpRequest.post(data.companyId ? 'customer/register' : 'customer/registerWithCompany', data)
}
export const updateRegisterInfo = data => {
  data.password = encryptPassword(data.password)
  return httpRequest.put('customer/updateRegisterInfo', data)
}
export const code2Session = data => httpRequest.get('customer/code2Session', data)

/**
 * @description: 微信相关接口
 * @param {string} encryptedData
 * @param {string} iv
 * @param {string} sessionKey
 */
export const wxLogin = data => httpRequest.post('customer/wxLogin', data)
export const getWxPhone = data => httpRequest.post('customer/getWxPhone', data)

export const getUserSession = () => {
  const userSession = getGlobalData('userSession')
  if (!userSession) {
    startLoading()
    Taro.login({
      success(res) {
        endLoading()
        let { code } = res
        code2Session({ code }).then(res => {
          setGlobalData('userSession', res.data)
        })
      }
    })
  }
}
