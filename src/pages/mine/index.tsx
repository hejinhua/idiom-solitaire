import React, { useMemo } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getGlobalData } from '@/utils/global-data'
import { customerService, pageToLogin, toPage } from '@/utils/utils'

import './index.styl'
import slashIcon from '@/assets/icons/red-slash.png'
import avatarIcon from '@/assets/icons/avatar.png'
import contactIcon from '@/assets/icons/contact.png'
import aboutIcon from '@/assets/icons/about.png'
import exitIcon from '@/assets/icons/exit.png'
import moreIcon from '@/assets/icons/more.png'

const menuList = [
  { icon: aboutIcon, name: '关于多味', id: 'about' },
  { icon: contactIcon, name: '联系多味', id: 'contact' },
  { icon: exitIcon, name: '退出登录', id: 'logout' }
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
        customerService()
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
        <Image src={avatarIcon} className='face' />
        <View className='flex-y'>
          <Text className='name'>{customerName}</Text>
          <Text className='phone'>{phone}</Text>
        </View>
      </View>
      <View className='menu flex-grow-y'>
        <View className='flex-x service'>
          <Image src={slashIcon} className='slash' />
          <Text className='service-text'>我的服务</Text>
        </View>
        {menuList.map(item => (
          <View key={item.id} className='menu-item' onClick={() => clickMenu(item.id)}>
            <View className='flex-center'>
              <Image src={item.icon} className='menu-icon' />
              <Text>{item.name}</Text>
            </View>
            <Image src={moreIcon} className='more' />
          </View>
        ))}
      </View>
    </View>
  )
}

export default Index
