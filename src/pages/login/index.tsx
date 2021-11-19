import React, { useState } from 'react'
import { View, Image, Text, Input } from '@tarojs/components'
import { isMobile, showToast } from '@/utils/utils'
import { login } from '@/services/api'

import './index.styl'

const Index = () => {
  const [data, setData] = useState({ phone: '', password: '' })
  const handleChange = (name, e) => {
    data[name] = e.detail.value
    setData(data)
  }
  const handleLogin = () => {
    const { phone, password } = data
    if (!phone) {
      showToast('请输入手机号')
    } else if (!isMobile(phone)) {
      showToast('手机号格式不正确')
    } else if (!password) {
      showToast('请输入密码')
    } else {
      login(data).then(res => {
        console.log(res)
      })
    }
  }
  return (
    <View className='wrapper'>
      <View className='bg' />
      <View className='form'>
        <View className='input-wrapper'>
          <Image src='' className='input-icon' />
          <Input
            type='number'
            placeholder='请输入手机号码/用户名'
            className='input'
            maxlength={11}
            onInput={e => handleChange('phone', e)}
          />
        </View>
        <View className='input-wrapper'>
          <Image src='' className='input-icon' />
          <Input
            type='text'
            password
            placeholder='请输入密码'
            className='input'
            maxlength={11}
            onInput={e => handleChange('password', e)}
          />
        </View>
        <View className='login-btn' onClick={handleLogin}>
          登录
        </View>
        <View className='register-link'>注册账号</View>
        <View className='tips'>
          <Text>忘记密码联系客服修改：</Text>
          <Text className='tips-underline'>立即联系</Text>
        </View>
      </View>
    </View>
  )
}

export default Index
