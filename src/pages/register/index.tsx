import React, { useState } from 'react'
import { View, Text, Input, Picker } from '@tarojs/components'
import { isMobile, showToast } from '@/utils/utils'
import { register } from '@/services/user'
import { getCompanyList } from '@/services/api'
import { CompanyType } from '@/constants/commonTypes'

import './index.styl'

const Index = () => {
  const [data, setData] = useState({
    phone: '',
    password: '',
    companyName: '',
    contactPerson: '',
    position: '',
    registerAddress: '',
    address: '',
    re_password: '',
    companyId: ''
  })
  const [companyList, setCompanyList] = useState<Array<CompanyType>>([])
  const handleChange = (name, e) => {
    const { value } = e.detail
    data[name] = name === 'registerAddress' ? value.join('、') : value
    setData({ ...data })
    if (name === 'companyName') {
      searchCompany(value)
    }
  }
  const handleRegister = () => {
    const { phone, password, companyName, contactPerson, registerAddress, address, re_password, position } = data
    if (!companyName) {
      showToast('请输入公司名称')
    } else if (!contactPerson) {
      showToast('请输入联系人')
    } else if (!position) {
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
      register(data).then(res => {
        // @ts-ignore
        delete data.re_password
        console.log(res)
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
    const { address, companyId, companyName, contactPerson, registerAddress } = item
    setData({ ...data, address, companyId, companyName, contactPerson, registerAddress })
    setCompanyList([])
  }
  return (
    <View className='wrapper'>
      <View className='bg' />
      <View className='form'>
        <View className='title'>详细信息</View>
        <View className='input-wrapper'>
          <Text className='label require'>公司名称</Text>
          <Input
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
          <Text className='label require'>联系人</Text>
          <Input
            type='text'
            placeholder='请输入联系人'
            className='input'
            onInput={e => handleChange('contactPerson', e)}
            value={data.contactPerson}
          />
        </View>
        <View className='input-wrapper'>
          <Text className='label require'>职位</Text>
          <Input
            type='text'
            placeholder='请输入职位'
            className='input'
            onInput={e => handleChange('position', e)}
            value={data.position}
          />
        </View>
        <View className='input-wrapper'>
          <Text className='label require'>注册地址</Text>
          <Picker
            mode='region'
            value={data.registerAddress.split('、')}
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
        <View className='login-btn' onClick={handleRegister}>
          提交
        </View>
      </View>
    </View>
  )
}

export default Index
