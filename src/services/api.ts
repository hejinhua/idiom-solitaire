/*
 * @Author: hjh
 * @Date: 2021-11-16 11:38:25
 * @Description: api
 */

import httpRequest from './request'

export const getCompanyList = data => {
  return httpRequest.get('company/list', data)
}

export const getBannerList = data => {
  return httpRequest.get('banner/list', data)
}
