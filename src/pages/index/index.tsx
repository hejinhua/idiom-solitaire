import React from 'react'
import { View } from '@tarojs/components'
import Banner from '@/components/Banner'

import './index.styl'

const Index = () => {
  return (
    <View className='wrapper'>
      <View className='bg' />
      <Banner bannerType={1} />
    </View>
  )
}

export default Index
