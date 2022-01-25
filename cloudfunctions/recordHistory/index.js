// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database({
    throwOnNotFound: false
  })
  const _ = db.command
  const { idiomList, method = 'put', userInfo } = event
  return new Promise((resolve, reject) => {
    if (method === 'put') {
      db.collection('history')
        .add({
          data: {
            idiomList,
            createTime: db.serverDate(),
            solitaireCount: idiomList.length,
            userInfo
          }
        })
        .then(res => {
          resolve(res.data)
        })
    } else if (method === 'get') {
      db.collection('history')
        .aggregate()
        .sort({
          solitaireCount: -1
        })
        .end()
        .then(res => {
          resolve(res.list)
        })
    }
  })
}
