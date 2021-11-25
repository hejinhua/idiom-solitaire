/*
 * @Author: hjh
 * @Date: 2021-11-20 17:51:12
 * @Description: 菜单/原料列表
 */
import React, { FC } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { DishType } from '@/constants/commonTypes'

import './index.styl'

type Props = {
  list: Array<DishType>
}
const Index: FC<Props> = ({ list }) => {
  return (
    <View className='list'>
      {list.map(item => (
        <View key={item.dishId} className='list-item flex-x'>
          <Image src={item.dishFace} className='face' />
          <View className='flex-grow-x flex-y'>
            <Text className='name'>{item.dishName}</Text>
            <Text className='desc'>{item.dishDesc}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}

export default React.memo(Index)
