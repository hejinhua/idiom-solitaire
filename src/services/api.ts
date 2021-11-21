/*
 * @Author: hjh
 * @Date: 2021-11-16 11:38:25
 * @Description: api
 */

import httpRequest from './request'

/**
 * @description 注册页搜索公司列表
 * @param {string} companyName
 * @return {array}
 */
export const getCompanyList = data => httpRequest.get('company/list', data)

/**
 * @description banner列表
 * @param {1|2} bannerType
 * @return {list}
 */
export const getBannerList = data => httpRequest.get('banner/list', data)
