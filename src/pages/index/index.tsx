import React, { useMemo, useEffect } from 'react'
import { View } from '@tarojs/components'
import Banner from '@/components/Banner'
import { getGlobalData } from '@/utils/globalData'
import Tab from '@/components/Tab'
import Taro from '@tarojs/taro'

import './index.styl'

const Index = () => {
  const { bottom } = useMemo(() => getGlobalData('capsuleInfo'), [])
  useEffect(() => {
    const token = Taro.getStorageSync('token')
    if (!token) {
      Taro.redirectTo({
        url: '/pages/login/index'
      })
    }
  }, [])
  return (
    <View className='wrapper'>
      <View className='bg' />
      <View className='content' style={{ top: `${bottom + 19}px` }}>
        <Banner bannerType={1} />
        <Tab />
      </View>
    </View>
  )
}

export default Index
