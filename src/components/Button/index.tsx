/*
 * @Author: hjh
 * @Date: 2021-11-20 17:51:12
 * @Description: 通用按钮
 */
import React, { FC, memo } from 'react'
import { View, Text } from '@tarojs/components'

import './index.styl'

type Props = {
  style?: any
  text: string
  size?: 'big' | 'normal'
  onClick: () => void
}
const Index: FC<Props> = ({ style, text, size = 'big', onClick }) => {
  return (
    <View className={`button ${size}`} onClick={onClick} style={style}>
      <Text>{text}</Text>
    </View>
  )
}

export default memo(Index)
