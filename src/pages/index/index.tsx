import React, { useEffect } from 'react'
import { View } from '@tarojs/components'

import './index.css'
import IButton from '@/components/IButton'
import withLogin from '@/utils/hoc/withLogin'
import { toPage } from '@/utils/utils'

const Index = () => {
  useEffect(() => {}, [])
  const handlePage = type => () => {
    toPage(`/pages/${type}/index`)
  }
  return (
    <View className='index'>
      <View className='action'>
        <IButton text='开始接龙' onClick={handlePage('play')} />
        <IButton text='历史成绩' onClick={handlePage('history')} style={{ marginTop: '30px' }} />
      </View>
    </View>
  )
}

export default withLogin(Index)
