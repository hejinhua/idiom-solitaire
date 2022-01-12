// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const _ = db.command
  const $ = _.aggregate
  const { idiom, idiomList } = event
  let a = idiom.pinyin.split(' ')
  const arr = getStartPinyinArr(a[a.length - 1])
  var reg = new RegExp('^(' + arr[0] + '|' + arr[1] + '|' + arr[2] + '|' + arr[3] + ')\\s.*')
  return new Promise((resolve, reject) => {
    db.collection('idiom')
      .where({
        pinyin: reg
      })
      .get()
      .then(res => {
        let data = res.data || []
        idiomList.forEach(a => {
          let index = data.findIndex(b => b.word === a.word)
          if (index !== -1) {
            data.splice(index, 1)
          }
        })
        let len = data.length
        if (len > 0) {
          let random = Math.floor(Math.random() * len)
          resolve(data[random])
        } else {
          resolve()
        }
      })
  })
}

const pinyinGroupMap = {
  a: ['ā', 'á', 'ǎ', 'à'],
  o: ['ō', 'ó', 'ǒ', 'ò'],
  e: ['ē', 'é', 'ě', 'è'],
  i: ['ī', 'í', 'ǐ', 'ì'],
  u: ['ū', 'ú', 'ǔ', 'ù'],
  ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ']
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

const getStartPinyinArr = pinyin => {
  let res
  for (let i = 0; i < pinyin.length; i++) {
    if (pinyinMap[pinyin[i]]) {
      let index = pinyinMap[pinyin[i]]
      pinyin = pinyin.replace(pinyin[i], index)
      res = pinyinGroupMap[index].map(w => {
        return pinyin.replace(index, w)
      })
      break
    }
  }
  return res
}
