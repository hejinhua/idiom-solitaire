import { Component } from 'react'
import Taro from '@tarojs/taro'

import './app.styl'

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
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
