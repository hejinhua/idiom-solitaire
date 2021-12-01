/*
 * @Author: hjh
 * @Date: 2021-11-25 17:36:20
 * @Description: 审核页面
 */
import React from 'react'
import { useRouter } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Button from '@/components/Button'
import { toPage } from '@/utils/utils'

import './index.styl'
import logoIcon from '@/assets/icons/logo.png'
import reviewingImg from '@/assets/images/reviewing.png'
import refuseImg from '@/assets/images/refuse.png'
import ServiceText from '@/components/ServiceText'

const resultMap = {
  reviewing: {
    img: reviewingImg,
    text: '信息审核中'
  },
  refuse: {
    img: refuseImg,
    text: '信息审核失败'
  }
}
const Index = () => {
  const { result = 'reviewing' } = useRouter()?.params || {}
  const handleUpdate = () => {
    toPage('/pages/register/index?update=true')
  }
  return (
    <View className='wrapper'>
      <View className='bg'>
        <Image src={logoIcon} className='logo' />
        <View className='logo-text flex-y'>
          <Text>Hi~ </Text>
          <Text>欢迎来到多味研创！</Text>
        </View>
      </View>
      <Image src={resultMap[result].img} className='img' />
      <Text className='text'>{resultMap[result].text}</Text>
      {result === 'refuse' && <Button text='修改信息' onClick={handleUpdate} style='margin-top: 80px; width: 320px;' />}
      <ServiceText text='如有疑问立即联系客服：' />
    </View>
  )
}

export default Index
