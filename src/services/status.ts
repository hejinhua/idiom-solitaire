/*
 * @Author: hjh
 * @Date: 2021-11-16 15:01:01
 * @Description: 状态码
 */
export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
}

export const CUSTOM_STATUS = {
  SUCCESS: 200,
  UN_REGISTER: 296, // 微信手机号没注册
  AUTH_FORBIDDEN: 297, // 账号被禁用
  AUTH_REVIEWING: 298, // 账号审核中
  AUTH_REFUSE: 299, // 账号审核被拒绝
  AUTHENTICATE: 403,
  SERVER_ERROR: 500
}
