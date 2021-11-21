/*
 * @Author: hjh
 * @Date: 2021-11-20 17:51:12
 * @Description: 左侧tab
 */
import React, { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { DishType } from '@/constants/commonTypes'
import { getDishList } from '@/services/api'

import './index.styl'

const Index = () => {
  const [list, setList] = useState<Array<DishType>>([])
  const [current, setCurrent] = useState(-1)
  const [subCurrent, setSubCurrent] = useState(-1)
  useEffect(() => {
    getDishList().then(res => {
      setList(res.data || [])
      if (res.data?.length > 0) {
        clickTab(res.data[0])
      }
    })
  }, [setList])

  const clickTab = item => {
    setCurrent(item.seriesId)
    if (item.dishSeriesList[0]) {
      setSubCurrent(item.dishSeriesList[0].seriesId)
    }
  }

  const clickSubTab = item => {
    setSubCurrent(item.seriesId)
  }

  return (
    <View className='tab'>
      {list.map(item => (
        <View key={item.seriesId} className={`tab-item ${current === item.seriesId ? 'active' : ''}`}>
          <Text className='tab-text' onClick={() => clickTab(item)}>
            {item.seriesName}
          </Text>
          {current === item.seriesId &&
            item.dishSeriesList.map(item => (
              <View
                key={item.seriesId}
                className={`sub-item ${subCurrent === item.seriesId ? 'sub-active' : ''}`}
                onClick={() => clickSubTab(item)}
              >
                {item.seriesName}
              </View>
            ))}
        </View>
      ))}
    </View>
  )
}

export default React.memo(Index)
