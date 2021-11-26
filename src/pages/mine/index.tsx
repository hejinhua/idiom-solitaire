import React, { useMemo } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getGlobalData } from '@/utils/global-data'
import { pageToLogin, toPage } from '@/utils/utils'

import './index.styl'

const menuList = [
  { icon: '', name: '关于多味', id: 'about' },
  { icon: '', name: '联系多味', id: 'contact' },
  { icon: '', name: '退出登录', id: 'logout' }
]
const Index = () => {
  const { customerName, phone } = useMemo(() => Taro.getStorageSync('userInfo'), [])
  const { height, top } = useMemo(() => getGlobalData('capsuleInfo'), [])
  const clickMenu = id => {
    switch (id) {
      case 'about':
        toPage('/pages/about/index')
        break
      case 'contact':
        break
      default:
        pageToLogin()
    }
  }
  return (
    <View className='wrapper flex-y'>
      <View className='bg' />
      <View className='flex-center title' style={`margin-top: ${top}px; height: ${height}px;`}>
        我的
      </View>
      <View className='info-wrapper flex-x'>
        <Image src='' className='face' />
        <View className='flex-y'>
          <Text className='name'>{customerName}</Text>
          <Text className='phone'>{phone}</Text>
        </View>
      </View>
      <View className='menu flex-grow-y'>
        <View className='flex service'>
          <Text className='service-text'>我的服务</Text>
        </View>
        {menuList.map(item => (
          <View key={item.id} className='menu-item' onClick={() => clickMenu(item.id)}>
            <View>
              {/* <Image src={item.icon} /> */}
              <Text>{item.name}</Text>
            </View>
            {/* <Image /> */}
          </View>
        ))}
      </View>
    </View>
  )
}

export default Index
