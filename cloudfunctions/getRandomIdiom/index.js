// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  return new Promise((resolve, reject) => {
    db.collection('idiom')
      .aggregate()
      .sample({
        size: 1
      })
      .end()
      .then(res => {
        resolve(res.list)
      })
  })
}
