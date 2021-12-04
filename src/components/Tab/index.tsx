/*
 * @Author: hjh
 * @Date: 2021-11-20 17:51:12
 * @Description: 左侧tab
 */
import React, { FC } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { SeriesType } from '@/constants/commonTypes'

import './index.styl'
import activeTabImg from '@/assets/icons/active-tab.png'

type Props = {
  list: Array<SeriesType>
  current?: number
  subCurrent?: number
  clickTab: (data) => void
  clickSubTab: (data) => void
}
const Index: FC<Props> = ({ list, current, subCurrent, clickTab, clickSubTab }) => {
  return (
    <View className='tab-bg'>
      <View className='tab'>
        {list.map(item => (
          <View key={item.seriesId} className={`tab-item ${current === item.seriesId ? 'active-tab' : ''}`}>
            {current === item.seriesId && <Image src={activeTabImg} className='active-img' />}
            <Text
              className={`tab-text ${current === item.seriesId ? 'active-text' : ''}`}
              onClick={() => clickTab(item)}
            >
              {item.seriesName}
            </Text>
            {current === item.seriesId &&
              (item.dishSeriesList || item.materialSeriesList)?.map(item => (
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
    </View>
  )
}

export default React.memo(Index)
