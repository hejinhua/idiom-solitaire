import React from 'react'
import { View } from '@tarojs/components'

import './index.css'
import IButton from '@/components/IButton'
import withLogin from '@/utils/hoc/withLogin'
import { toPage } from '@/utils/utils'
import { useShareAppMessage } from '@tarojs/taro'

const Index = ({ checkLogin }) => {
  useShareAppMessage(() => ({
    title: '一起来成语接龙吧～',
    path: '/pages/index/index'
  }))
  const handlePage = type => () => {
    checkLogin(() => {
      toPage(`/pages/${type}/index`)
    })
  }
  return (
    <View className='index'>
      <View className='action'>
        <IButton text='开始接龙' onClick={handlePage('play')} />
        <IButton text='排行榜' onClick={handlePage('rank')} style={{ margin: '20px 0' }} />
        <IButton text='历史成绩' onClick={handlePage('history')} />
      </View>
    </View>
  )
}

export default withLogin(Index)
