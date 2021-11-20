/*
 * @Author: hjh
 * @Date: 2021-11-20 16:36:13
 * @Description: 用户登录 api
 */
// eslint-disable-next-line
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
