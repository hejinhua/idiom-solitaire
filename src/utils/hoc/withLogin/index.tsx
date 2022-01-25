/*
 * @Author: hjh
 * @Date: 2022-01-07 17:07:14
 * @Description: login HOC
 */
import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'

import Taro from '@tarojs/taro'
import './index.css'
import IButton from '@/components/IButton'
import { showToast } from '@/utils/utils'
import { cloudFunction } from '@/services/cloudFunction'
import closeIcon from '@/assets/icons/close.png'

const withLogin = WrappedComponent => {
  return class extends Component {
    state = {
      showLoginModal: false
    }
    componentDidMount() {
      this.checkLogin()
    }
    checkLogin = (callback?) => {
      const userInfo = Taro.getStorageSync('userInfo')
      if (userInfo) {
        callback && callback()
        return
      } else {
        this.setState({ showLoginModal: true })
      }
    }
    getUserInfo = () => {
      this.setState({ showLoginModal: false })
      Taro.getUserProfile({
        desc: '用于完善用户信息',
        success: res => {
          Taro.setStorage({ key: 'userInfo', data: res.userInfo })
          cloudFunction({ name: 'login', data: { userInfo: res.userInfo } }).then(() => {
            showToast('登录成功')
          })
        }
      })
    }
    cancel = () => {
      this.setState({ showLoginModal: false })
    }
    render() {
      const { showLoginModal } = this.state
      return (
        <View>
          <WrappedComponent checkLogin={this.checkLogin} />
          {showLoginModal && (
            <View className='modal-mask flex-center'>
              <View className='login-modal'>
                <View className='modal-header'>
                  <Text>登录</Text>
                </View>
                <Text>申请获得您的公开信息（昵称、头像等）</Text>
                <IButton text='微信授权' size='normal' onClick={this.getUserInfo} />
                <Image src={closeIcon} className='close' onClick={this.cancel} />
              </View>
            </View>
          )}
        </View>
      )
    }
  }
}
export default withLogin
