/*
 * @Author: hjh
 * @Date: 2022-01-07 17:07:14
 * @Description: login HOC
 */
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'

import Taro from '@tarojs/taro'
import './index.css'
import IButton from '@/components/IButton'
import { showToast } from '@/utils/utils'
import { cloudFunction } from '@/services/cloudFunction'

const withLogin = WrappedComponent => {
  return class extends Component {
    state = {
      showLoginModal: false
    }
    componentDidMount() {
      this.checkLogin()
    }
    checkLogin = () => {
      const userInfo = Taro.getStorageSync('userInfo')
      if (userInfo) {
        return
      } else {
        cloudFunction({ name: 'login' }).then(res => {
          if (res) {
            Taro.setStorage({ key: 'userInfo', data: res })
          } else {
            this.setState({ showLoginModal: true })
          }
        })
      }
    }
    getUserInfo = () => {
      Taro.getUserProfile({
        desc: '用于完善用户信息',
        success: res => {
          Taro.setStorage({ key: 'userInfo', data: res.userInfo })
          cloudFunction({ name: 'login', data: { userInfo: res.userInfo } }).then(() => {
            showToast('登录成功')
            this.setState({ showLoginModal: false })
          })
        }
      })
    }
    render() {
      const { showLoginModal } = this.state
      return (
        <View>
          <WrappedComponent />
          {showLoginModal && (
            <View className='modal-mask flex-center'>
              <View className='login-modal'>
                <Text>请先登录</Text>
                <IButton text='微信登录' size='normal' onClick={this.getUserInfo} />
              </View>
            </View>
          )}
        </View>
      )
    }
  }
}
export default withLogin
