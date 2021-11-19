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
        <View className='title'>详细信息</View>
        <View className='input-wrapper'>
          <Text className='label require'>公司名称</Text>
          <Input type='text' placeholder='请输入公司名称' className='input' onInput={e => handleChange('phone', e)} />
        </View>
        <View className='input-wrapper'>
          <Text className='label require'>联系人</Text>
          <Input type='text' placeholder='请输入联系人' className='input' onInput={e => handleChange('phone', e)} />
        </View>
        <View className='input-wrapper'>
          <Text className='label'>职位</Text>
          <Input type='text' placeholder='请输入职位' className='input' onInput={e => handleChange('phone', e)} />
        </View>
        <View className='input-wrapper'>
          <Text className='label require'>注册地址</Text>
          <Input
            type='text'
            placeholder='请选择省份、城市、地区'
            className='input'
            onInput={e => handleChange('phone', e)}
          />
        </View>
        <View className='input-wrapper'>
          <Text className='label require'>详细地址</Text>
          <Input type='text' placeholder='请输入详细地址' className='input' onInput={e => handleChange('phone', e)} />
        </View>
        <View className='title'>手机验证</View>
        <View className='input-wrapper'>
          <Text className='label require'>手机号码</Text>
          <Input type='number' placeholder='请输入手机号码' className='input' onInput={e => handleChange('phone', e)} />
        </View>
        <View className='input-wrapper'>
          <Text className='label require'>密码</Text>
          <Input
            type='text'
            password
            placeholder='请输入6位以上密码'
            className='input'
            onInput={e => handleChange('phone', e)}
          />
        </View>
        <View className='input-wrapper'>
          <Text className='label require'>再次输入</Text>
          <Input
            type='text'
            password
            placeholder='再次输入密码'
            className='input'
            onInput={e => handleChange('phone', e)}
          />
        </View>
        <View className='login-btn' onClick={handleLogin}>
          提交
        </View>
      </View>
    </View>
  )
}

export default Index
