/*
 * @Author: hjh
 * @Date: 2021-11-20 17:51:12
 * @Description: 企业微信弹窗
 */
import React, { useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import { getQrImage } from '@/services/api'
import Button from '../Button'
import { getGlobalData, setGlobalData } from '@/utils/global-data'

import './index.styl'

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

  const handleClick = () => {
    // TODO 保存微信图片
  }

  return (
    <View className='mask flex-center'>
      <View className='modal'>
        <Image src={img} className='qr' />
        <Button text='立即添加企业微信' size='normal' onClick={handleClick} style='margin-top: 5px;' />
      </View>
      <Image src='' className='close' onClick={onClose} />
    </View>
  )
}

export default React.memo(Index)
