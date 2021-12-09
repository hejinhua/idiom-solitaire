/*
 * @Author: hjh
 * @Date: 2021-11-25 17:36:20
 * @Description: 关于多味
 */
import React, { useEffect, useState } from 'react'
import { View, Image } from '@tarojs/components'
import { baseCDNUrl } from '@/services/baseUrl'
import { getAboutDesc } from '@/services/api'

import './index.styl'

const Index = () => {
  const [imgs, setImgs] = useState([])
  useEffect(() => {
    getAboutDesc().then(res => {
      setImgs(res.data?.split(',') || [])
    })
  }, [])
  return (
    <View className='wrapper'>
      {imgs.map(item => (
        <Image key={baseCDNUrl + item} src={item} mode='widthFix' className='img' />
      ))}
    </View>
  )
}

export default Index
