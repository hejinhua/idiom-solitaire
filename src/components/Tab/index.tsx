/*
 * @Author: hjh
 * @Date: 2021-11-20 17:51:12
 * @Description: 左侧tab
 */
import React from 'react'
import { View, Text } from '@tarojs/components'

import './index.styl'

const Index = ({ list, current, subCurrent, clickTab, clickSubTab }) => {
  return (
    <View className='tab'>
      {list.map(item => (
        <View key={item.seriesId} className={`tab-item ${current === item.seriesId ? 'active' : ''}`}>
          <Text className='tab-text' onClick={() => clickTab(item)}>
            {item.seriesName}
          </Text>
          {current === item.seriesId &&
            item.dishSeriesList?.map(item => (
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
