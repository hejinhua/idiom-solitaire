import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text, Input, Button } from '@tarojs/components'
import { isMobile, showToast, toPage } from '@/utils/utils'
import { getUserSession, login, wxLogin } from '@/services/user'
import CustomButton from '@/components/Button'
import QrModal from '@/components/QrModal'

import './index.styl'
import passwordIcon from '@/assets/icons/password.png'
import phoneIcon from '@/assets/icons/phone.png'
import logoIcon from '@/assets/icons/logo.png'
import { getGlobalData } from '@/utils/global-data'

const Index = () => {
  const [data, setData] = useState({ phone: Taro.getStorageSync('phone') || '', password: '' })
  const [visible, setVisible] = useState(false)
  const toogleVisible = () => {
    setVisible(!visible)
  }
  useEffect(() => {
    getUserSession()
  }, [])
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
      Taro.setStorage({ data: phone, key: 'phone' })
      login({ phone, password }).then(res => {
        if (res?.data) {
          const { token } = res.data
          Taro.setStorageSync('token', token)
          Taro.setStorage({ key: 'userInfo', data: res.data })
          toPage('/pages/index/index', true)
        }
      })
    }
  }
  const toRegister = () => {
    toPage('/pages/register/index')
  }
  const getPhoneNumber = e => {
    const { errMsg, encryptedData, iv } = e.detail
    if (errMsg == 'getPhoneNumber:ok') {
      const userSession = getGlobalData('userSession')
      wxLogin({ ...userSession, encryptedData, iv }).then(res => {
        if (res?.data) {
          const { token } = res.data
          Taro.setStorageSync('token', token)
          Taro.setStorage({ key: 'userInfo', data: res.data })
          toPage('/pages/index/index', true)
        }
      })
    } else {
      showToast('获取手机号失败，请允许授权')
    }
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
      <View className='form'>
        <View className='input-wrapper'>
          <Image src={phoneIcon} className='input-icon' />
          <Input
            value={data.phone}
            type='number'
            placeholder='请输入手机号码/用户名'
            className='input'
            maxlength={11}
            onInput={e => handleChange('phone', e)}
          />
        </View>
        <View className='input-wrapper'>
          <Image src={passwordIcon} className='input-icon' />
          <Input
            type='text'
            password
            placeholder='请输入密码'
            className='input'
            maxlength={11}
            onInput={e => handleChange('password', e)}
          />
        </View>
        <CustomButton text='登录' onClick={handleLogin} style='margin-top: 100rpx' />
        <Button openType='getPhoneNumber' onGetPhoneNumber={getPhoneNumber}>
          微信一键登录
        </Button>
        <View className='register-link' onClick={toRegister}>
          注册账号
        </View>
        <View className='tips'>
          <Text>忘记密码联系客服修改：</Text>
          <Text className='tips-underline' onClick={toogleVisible}>
            立即联系
          </Text>
        </View>
      </View>
      <QrModal visible={visible} onClose={toogleVisible} />
    </View>
  )
}

export default Index
