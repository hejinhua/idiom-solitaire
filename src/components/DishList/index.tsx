/*
 * @Author: hjh
 * @Date: 2021-11-20 17:51:12
 * @Description: 菜单/原料列表
 */
import React from 'react'
import { View, Text, Image } from '@tarojs/components'

import './index.styl'

const Index = ({ list }) => {
  return (
    <View className='list'>
      {list.map(item => (
        <View key={item.seriesId} className={'tab-item'}>
          <Text className='tab-text'>{item.seriesName}</Text>
        </View>
      ))}
    </View>
  )
}

export default React.memo(Index)
