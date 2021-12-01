/*
 * @Author: hjh
 * @Date: 2021-11-20 17:51:12
 * @Description: 联系客服text
 */
import React, { useState, Fragment, FC } from 'react'
import { View, Text } from '@tarojs/components'
import QrModal from '@/components/QrModal'

import './index.styl'

type Props = {
  text?: String
  style?: any
}
const Index: FC<Props> = ({ text, style }) => {
  const [visible, setVisible] = useState(false)
  const toogleVisible = () => {
    setVisible(!visible)
  }
  return (
    <Fragment>
      <View className='tips' style={style}>
        <Text>{text || '忘记密码联系客服修改：'}</Text>
        <Text className='tips-underline' onClick={toogleVisible}>
          立即联系
        </Text>
      </View>
      <QrModal visible={visible} onClose={toogleVisible} />
    </Fragment>
  )
}

export default React.memo(Index)
