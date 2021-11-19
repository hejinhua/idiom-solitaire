/*
 * @Author: hjh
 * @Date: 2021-11-16 14:58:48
 * @Description: baseUrl
 */

const getBaseUrl = () => {
  let BASE_URL = 'https://www.bzchao.com/web9000/api/'
  // if (process.env.NODE_ENV === 'development') {
  //   BASE_URL = ''
  // } else {
  //   BASE_URL = ''
  // }
  return BASE_URL
}

export default getBaseUrl
