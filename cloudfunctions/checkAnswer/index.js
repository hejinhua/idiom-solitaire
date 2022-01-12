// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { idiom, answer } = event
  const db = cloud.database({
    throwOnNotFound: false
  })

  return new Promise((resolve, reject) => {
    db.collection('idiom')
      .where({ word: answer })
      .get()
      .then(res => {
        const result = res.data[0]
        if (result) {
          if (checkSolitaire(idiom.pinyin, result.pinyin)) {
            resolve({
              code: 200,
              data: res.data[0]
            })
          } else {
            resolve({
              code: 500,
              msg: '接龙错误'
            })
          }
        } else {
          resolve({
            code: 500,
            msg: '该成语不存在'
          })
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

const pinyinMap = {
  ā: 'a',
  á: 'a',
  ǎ: 'a',
  à: 'a',
  ō: 'o',
  ó: 'o',
  ǒ: 'o',
  ò: 'o',
  ē: 'e',
  é: 'e',
  ě: 'e',
  è: 'e',
  ī: 'i',
  í: 'i',
  ǐ: 'i',
  ì: 'i',
  ū: 'u',
  ú: 'u',
  ǔ: 'u',
  ù: 'u',
  ǖ: 'ü',
  ǘ: 'ü',
  ǚ: 'ü',
  ǜ: 'ü'
}
const checkSolitaire = (pinyin1, pinyin2) => {
  let arr1 = pinyin1.split(' ')
  let arr2 = pinyin2.split(' ')
  let a = arr1[arr1.length - 1]
  for (let i = 0; i < a.length; i++) {
    if (pinyinMap[a[i]]) {
      a = a.replace(a[i], pinyinMap[a[i]])
      break
    }
  }
  let b = arr2[0]
  for (let i = 0; i < b.length; i++) {
    if (pinyinMap[b[i]]) {
      b = b.replace(b[i], pinyinMap[b[i]])
      break
    }
  }
  return a === b
}
