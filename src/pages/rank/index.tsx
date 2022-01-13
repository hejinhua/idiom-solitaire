import React, { useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'

import './index.css'
import { cloudFunction } from '@/services/cloudFunction'

const Index = () => {
  const [list, setList] = useState<any>()
  useEffect(() => {
    cloudFunction({
      name: 'rankingList'
    }).then(res => {
      setList(res)
    })
  }, [])
  return (
    <View className='wrapper'>
      {list?.map((item, index) => (
        <View key={item._id} className='histort-item'>
          <View className='flex-center'>
            <Text className={index <= 2 ? `normal posi${index}` : 'normal'}>{index + 1}</Text>
            <Image src={item.userInfo.avatarUrl} className='face' />
            <Text>{item.userInfo.nickName}</Text>
          </View>
          <View className='grade'>
            <Text>接龙</Text>
            <Text className='count'>{item.solitaireCount}</Text>次
          </View>
        </View>
      ))}
    </View>
  )
}

export default Index
