/*
 * @Author: hjh
 * @Date: 2021-11-20 17:51:12
 * @Description: 详情页Card
 */
import React from 'react'
import { View, Text } from '@tarojs/components'

import './index.styl'

const Index = ({ title, children }) => {
  return (
    <View className='card'>
      <View className='card-title'>
        <Text>{title}</Text>
      </View>
      <View className='card-content'>{children}</View>
    </View>
  )
}

export default React.memo(Index)
