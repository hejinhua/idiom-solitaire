/*
 * @Author: hjh
 * @Date: 2021-11-20 17:51:12
 * @Description: 企业微信弹窗
 */
import React, { useState, useEffect } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { getQrImage } from '@/services/api'
import { getGlobalData, setGlobalData } from '@/utils/global-data'

import './index.styl'
import closeIcon from '@/assets/icons/close.png'

const Index = ({ visible, onClose }) => {
  if (!visible) return null
  const [img, setImg] = useState('')
  useEffect(() => {
    const img = getGlobalData('qrImg')
    if (img) {
      setImg(img)
    } else {
      getQrImage().then(res => {
        setImg(res?.data)
        setGlobalData('qrImg', res?.data)
      })
    }
  }, [setImg])

  return (
    <View className='mask flex-center'>
      <View className='modal'>
        <Image src={img} className='qr' mode='widthFix' showMenuByLongpress />
        <Text className='text'>长按识别二维码</Text>
      </View>
      <Image src={closeIcon} className='close' onClick={onClose} />
    </View>
  )
}

export default React.memo(Index)
