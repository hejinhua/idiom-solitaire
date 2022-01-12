// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const { userInfo } = event
  const wxContext = cloud.getWXContext()
  const db = cloud.database({
    throwOnNotFound: false
  })
  const userDB = db.collection('user')
  return new Promise((resolve, reject) => {
    if (!userInfo) {
      userDB
        .where({
          openid: wxContext.OPENID
        })
        .get()
        .then(res => {
          resolve(res.data[0])
        })
        .catch(() => {
          reject('error')
        })
    } else {
      userDB
        .add({
          data: { ...userInfo, openid: wxContext.OPENID }
        })
        .then(res => {
          resolve(res)
        })
        .catch(() => {
          reject('error')
        })
    }
  })
}
