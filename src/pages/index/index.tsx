import React, { useMemo } from 'react'
import { View } from '@tarojs/components'
import Banner from '@/components/Banner'

import './index.styl'
import { getGlobalData } from '@/utils/globalData'
import Tab from '@/components/Tab'

const Index = () => {
  const { bottom } = useMemo(() => getGlobalData('capsuleInfo'), [])
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
