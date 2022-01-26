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
  const solitaireCount = Math.floor(idiomList.length / 2)
  return new Promise((resolve, reject) => {
    if (method === 'put') {
      db.collection('history')
        .add({
          data: {
            idiomList,
            createTime: db.serverDate(),
            solitaireCount,
            userInfo,
            openid: wxContext.OPENID
          }
        })
        .then(res => {
          resolve(res.data)
        })
    } else if (method === 'get') {
      db.collection('history')
        .where({
          openid: wxContext.OPENID
        })
        .orderBy('solitaireCount', 'desc')
        .get()
        .then(res => {
          resolve(res.data)
        })
    }
  })
}
