import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'

import './index.css'
import { cloudFunction } from '@/services/cloudFunction'
import { formatDate } from '@/utils/utils'

const Index = () => {
  const [list, setList] = useState<any>()
  useEffect(() => {
    cloudFunction({
      name: 'recordHistory',
      data: {
        method: 'get'
      }
    }).then(res => {
      // @ts-ignore
      res?.forEach(item => {
        console.log(item.createTime)
        item.createTime = formatDate(item.createTime)
      })
      setList(res)
    })
  }, [])
  return (
    <View className='wrapper'>
      {list?.map(item => (
        <View key={item._id} className='histort-item'>
          {item.createTime} 接龙{item.solitaireCount}次
        </View>
      ))}
    </View>
  )
}

export default Index
