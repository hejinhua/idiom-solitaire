import { Component } from 'react'
import Taro from '@tarojs/taro'

import './app.css'

class App extends Component {
  componentDidMount() {
    const updateManager = Taro.getUpdateManager()
    updateManager.onCheckForUpdate(function(res) {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function() {
          Taro.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function(res) {
              if (res.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        })
        updateManager.onUpdateFailed(function() {
          Taro.showModal({
            title: '更新提示',
            content: '新版本下载失败，请删除小程序重新后重新搜索打开',
            showCancel: false
          })
        })
      }
    })
    this.cloudInit()
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  cloudInit = () => {
    if (!Taro.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      Taro.cloud.init({
        env: 'cloud1-5gwefth1dd909e23',
        traceUser: true
      })
    }
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
