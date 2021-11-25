/*
 * @Author: hjh
 * @Date: 2021-11-25 17:36:20
 * @Description: 审核页面
 */
import React from 'react'
import { useRouter } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Button from '@/components/Button'
import { toPage } from '@/utils/utils'

import './index.styl'

const Index = () => {
  const { result } = useRouter()?.params || {}
  const handleUpdate = () => {
    toPage('/pages/register/index?update=true')
  }
  return (
    <View className='wrapper'>
      {result === 'reviewing' && <Text>信息审核中</Text>}
      {result === 'refuse' && (
        <View>
          <Text>信息审核失败</Text>
          <Button text='修改信息' onClick={handleUpdate} style='margin-top: 100px' />
        </View>
      )}
    </View>
  )
}

export default Index
