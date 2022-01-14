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
  return new Promise((resolve, reject) => {
    db.collection('user')
      .get()
      .then(res => {
        if (res.data[0]) {
          resolve(res.data[0])
        } else {
          db.collection('user')
            .add({
              data: { ...userInfo, createTime: db.serverDate() }
            })
            .then(res => {
              resolve(res)
            })
            .catch(() => {
              reject('error')
            })
        }
      })
      .catch(() => {
        reject('error')
      })
  })
}
