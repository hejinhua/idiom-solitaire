/*
 * @Author: hjh
 * @Date: 2021-11-20 17:51:12
 * @Description: 通用按钮
 */
import React, { FC, memo } from 'react'
import { View, Text } from '@tarojs/components'

import './index.css'

type Props = {
  style?: any
  text: string
  size?: 'big' | 'normal'
  outline?: boolean
  onClick: () => void
}
const Index: FC<Props> = ({ style, text, size = 'big', outline, onClick }) => {
  return (
    <View className={`button ${size} ${outline ? 'outline' : ''}`} onClick={onClick} style={style}>
      <Text>{text}</Text>
    </View>
  )
}

export default memo(Index)
