// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database({
    throwOnNotFound: false
  })
  const _ = db.command
  const { idiomList, method = 'put', userInfo } = event
  return new Promise((resolve, reject) => {
    db.collection('history')
      .aggregate()
      .sort({
        solitaireCount: -1
      })
      .limit(10)
      .end()
      .then(res => {
        resolve(res.list)
      })
  })
}
