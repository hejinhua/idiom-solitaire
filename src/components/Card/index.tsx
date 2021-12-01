/*
 * @Author: hjh
 * @Date: 2021-11-20 17:51:12
 * @Description: 详情页Card
 */
import React, { useState, Fragment } from 'react'
import { View, Text, Image } from '@tarojs/components'
import QrModal from '@/components/QrModal'

import './index.styl'
import slashIcon from '@/assets/icons/yellow-slash.png'
import lockIcon from '@/assets/icons/lock.png'

const Index = ({ title, children, showMore = false }) => {
  const [visible, setVisible] = useState(false)
  const toogleVisible = () => {
    setVisible(!visible)
  }
  return (
    <Fragment>
      <View className='card'>
        <View className='card-title'>
          <View className='flex-center'>
            <Image src={slashIcon} className='slash' />
            <Text>{title}</Text>
          </View>
          {showMore && (
            <View className='more flex-center' onClick={toogleVisible}>
              <Image src={lockIcon} className='lock' />
              <Text>解锁了解更多</Text>
            </View>
          )}
        </View>
        <View className='card-content'>{children}</View>
      </View>
      <QrModal visible={visible} onClose={toogleVisible} />
    </Fragment>
  )
}

export default React.memo(Index)
