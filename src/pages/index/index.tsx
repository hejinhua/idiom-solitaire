import React from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import './index.styl'
import { toPage } from '@/utils/utils'

const Index = () => {
  const token = Taro.getStorageSync('token')
  if (!token) {
    toPage('/pages/login/index', true)
  } else {
    toPage('/pages/dish/index')
  }
  return <View className='wrapper' />
}

export default Index
