import React, { useState, useMemo } from 'react'
import { useRouter } from '@tarojs/taro'
import { View, Text, Input, Picker, Image } from '@tarojs/components'
import { isMobile, pageToLogin, showToast } from '@/utils/utils'
import { register, updateRegisterInfo } from '@/services/user'
import { getCompanyList } from '@/services/api'
import { CompanyType } from '@/constants/commonTypes'
import Button from '@/components/Button'
import { getGlobalData } from '@/utils/global-data'
import logoIcon from '@/assets/icons/logo.png'

import './index.styl'

const Index = () => {
  const { update } = useRouter()?.params || {}
  const [data, setData] = useState({
    phone: '',
    password: '',
    companyName: '',
    customerName: '',
    companyPosition: '',
    registerAddress: '',
    address: '',
    re_password: '',
    companyId: ''
  })
  const [companyList, setCompanyList] = useState<Array<CompanyType>>([])
  const disabled = useMemo(() => {
    if (update === 'true') {
      const { company, phone, customerName, customerId, companyPosition } = getGlobalData('updateUserInfo') || {}
      const { companyId, companyName, registerAddress, address } = company || {}
      setData({ ...data, phone, companyName, customerName, registerAddress, address, companyId, companyPosition })
      return customerId !== company.customerId
    } else {
      return false
    }
  }, [])
  const handleChange = (name, e) => {
    const { value } = e.detail
    data[name] = name === 'registerAddress' ? value.join('、') : value
    setData({ ...data })
    if (name === 'companyName') {
      searchCompany(value)
    }
  }
  const handleRegister = () => {
    const { re_password, ...rest } = data
    const { phone, password, companyName, customerName, registerAddress, address, companyPosition } = rest
    if (!companyName) {
      showToast('请输入公司名称')
    } else if (!customerName) {
      showToast('请输入联系人')
    } else if (!companyPosition) {
      showToast('请输入职位')
    } else if (!registerAddress) {
      showToast('请输入注册地址')
    } else if (!address) {
      showToast('请输入详细地址')
    } else if (!phone) {
      showToast('请输入手机号')
    } else if (!isMobile(phone)) {
      showToast('手机号格式不正确')
    } else if (!password) {
      showToast('请输入密码')
    } else if (password.length < 6) {
      showToast('请输入6位以上密码')
    } else if (!re_password) {
      showToast('请再次输入密码')
    } else if (password !== re_password) {
      showToast('两次密码输入不一致')
    } else {
      const api = update === 'true' ? updateRegisterInfo : register
      if (update === 'true') {
        // @ts-ignore
        data.token = getGlobalData('updateUserInfo').token
      }
      api(rest).then(() => {
        pageToLogin()
      })
    }
  }
  const searchCompany = companyName => {
    if (companyName) {
      getCompanyList({ companyName }).then(res => {
        setCompanyList(res.data || [])
      })
    } else {
      setCompanyList([])
    }
  }
  const selectCompany = item => {
    const { address, companyId, companyName, customerName, registerAddress } = item
    setData({ ...data, address, companyId, companyName, customerName, registerAddress })
    setCompanyList([])
  }
  return (
    <View className='wrapper'>
      <View className='bg'>
        <Image src={logoIcon} className='logo' />
        <View className='logo-text flex-y'>
          <Text>Hi~ </Text>
          <Text>欢迎注册</Text>
        </View>
      </View>
      <View className='form'>
        <View className='title'>公司信息</View>
        <View className='input-wrapper'>
          <Text className='label require'>公司名称</Text>
          <Input
            disabled={disabled}
            type='text'
            placeholder='请输入公司名称'
            className='input'
            value={data.companyName}
            onInput={e => handleChange('companyName', e)}
          />
          {companyList.length > 0 && (
            <View className='company-list'>
              {companyList.map(item => (
                <View key={item.companyId} className='company-item' onClick={() => selectCompany(item)}>
                  {item.companyName}
                  {item.status !== 1 && `(${item.companyStatus})`}
                </View>
              ))}
            </View>
          )}
        </View>
        <View className='input-wrapper'>
          <Text className='label require'>注册地址</Text>
          <Picker
            mode='region'
            value={data.registerAddress?.split('、')}
            onChange={e => handleChange('registerAddress', e)}
            className='input'
          >
            <View>{data.registerAddress || '请选择省份、城市、地区'}</View>
          </Picker>
        </View>
        <View className='input-wrapper'>
          <Text className='label require'>详细地址</Text>
          <Input
            type='text'
            placeholder='请输入详细地址'
            className='input'
            onInput={e => handleChange('address', e)}
            value={data.address}
          />
        </View>
        <View className='title'>用户信息</View>
        <View className='input-wrapper'>
          <Text className='label require'>姓名</Text>
          <Input
            type='text'
            placeholder='请输入您的姓名'
            className='input'
            onInput={e => handleChange('customerName', e)}
            value={data.customerName}
          />
        </View>
        <View className='input-wrapper'>
          <Text className='label require'>职位</Text>
          <Input
            type='text'
            placeholder='请输入职位'
            className='input'
            onInput={e => handleChange('companyPosition', e)}
            value={data.companyPosition}
          />
        </View>
        <View className='input-wrapper'>
          <Text className='label require'>手机号码</Text>
          <Input
            type='number'
            placeholder='请输入手机号码'
            className='input'
            onInput={e => handleChange('phone', e)}
            value={data.phone}
          />
        </View>
        <View className='input-wrapper'>
          <Text className='label require'>密码</Text>
          <Input
            type='text'
            password
            placeholder='请输入6位以上密码'
            className='input'
            onInput={e => handleChange('password', e)}
          />
        </View>
        <View className='input-wrapper'>
          <Text className='label require'>再次输入</Text>
          <Input
            type='text'
            password
            placeholder='再次输入密码'
            className='input'
            onInput={e => handleChange('re_password', e)}
          />
        </View>
        <Button text='提交' onClick={handleRegister} style='margin-top: 100rpx' />
      </View>
    </View>
  )
}

export default Index
