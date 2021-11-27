import React, { useState, useEffect } from 'react'
import { View, Text, Input, Picker, Radio } from '@tarojs/components'
import Taro, { useRouter, setNavigationBarTitle } from '@tarojs/taro'

import './index.styl'
import Button from '@/components/Button'
import { isMobile, showToast } from '@/utils/utils'
import { orderDish } from '@/services/api'

const Index = () => {
  const { dishName } = useRouter()?.params || {}
  const [data, setData] = useState({
    customerName: '',
    customerPhone: '',
    tasteType: 1,
    tasteTime: '',
    address: '',
    remark: ''
  })
  const [today, setToday] = useState('')
  useEffect(() => {
    setNavigationBarTitle({ title: dishName || '预约试菜' })
    const date = new Date()
    setToday(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
  }, [])

  const handleChange = (name, e) => {
    const { value } = e.detail
    data[name] = name === 'tasteTime' ? value.replaceAll('-', '/') : value
    setData({ ...data })
  }
  const handleOrder = () => {
    const { customerName, customerPhone, tasteTime, address } = data
    if (!customerName) {
      showToast('请输入您的名字')
    } else if (!customerPhone) {
      showToast('请输入您的电话')
    } else if (!isMobile(customerPhone)) {
      showToast('手机号格式不正确')
    } else if (!tasteTime) {
      showToast('请输入预约试菜时间')
    } else if (!address) {
      showToast('请输入预约试菜地址')
    } else {
      orderDish(data).then(() => {
        Taro.navigateBack({
          delta: 1
        })
      })
    }
  }
  return (
    <View className='wrapper'>
      <View className='bg' />
      <View className='form'>
        <Input
          type='text'
          placeholder='您的名字'
          className='input require'
          onInput={e => handleChange('customerName', e)}
        />
        <Input
          type='text'
          placeholder='您的电话'
          className='input require'
          onInput={e => handleChange('customerPhone', e)}
        />
        <Picker mode='date' start={today} value={data.tasteTime} onChange={e => handleChange('tasteTime', e)}>
          <View className='input require'>{data.tasteTime || '预约试菜时间'}</View>
        </Picker>
        <Input
          type='text'
          placeholder='预约试菜地址'
          className='input require'
          onInput={e => handleChange('address', e)}
        />
        <Input type='text' placeholder='备注' className='input' onInput={e => handleChange('remark', e)} />
        <View className='label require'>试菜类型</View>
        <View className='radio-box'>
          <View className='flex-center'>
            <Radio
              value='1'
              checked={data.tasteType === 1}
              color='#E74434'
              onClick={() => {
                setData({ ...data, tasteType: 1 })
              }}
            />
            <Text>在家试吃</Text>
          </View>
          <View className='flex-center'>
            <Radio
              value='2'
              checked={data.tasteType === 2}
              color='#E74434'
              onClick={() => {
                setData({ ...data, tasteType: 2 })
              }}
            />
            <Text>去指定地试吃</Text>
          </View>
        </View>
        <Button text='立即预约' size='normal' onClick={handleOrder} style='margin-top: 40px' />
      </View>
    </View>
  )
}

export default Index
