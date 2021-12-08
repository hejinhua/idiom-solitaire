/*
 * @Author: hjh
 * @Date: 2021-11-20 17:51:12
 * @Description: banner+左侧tab+list
 */
import React, { FC, Fragment, useMemo, useCallback, useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { SeriesType, DishType, MaterialType } from '@/constants/commonTypes'
import { getTimestamp, toPage } from '@/utils/utils'
import Banner from '@/components/Banner'
import { getGlobalData } from '@/utils/global-data'
import Taro from '@tarojs/taro'

import './index.styl'
import activeTabImg from '@/assets/icons/active-tab.png'

type Props = {
  seriesList: Array<SeriesType>
  current?: number
  subCurrent?: number
  clickTab: (data) => void
  clickSubTab: (data) => void
  list: Array<DishType> | Array<MaterialType>
  bannerType: 1 | 2
}
const Index: FC<Props> = ({ seriesList, current, subCurrent, clickTab, clickSubTab, list, bannerType }) => {
  const { bottom } = useMemo(() => getGlobalData('capsuleInfo'), [])
  const [scrollTop, setScrollTop] = useState(0)
  const [topMap, setTopMap] = useState<any>({})
  const handleClick = item => {
    toPage(
      item.dishId
        ? `/pages/dishDetail/index?dishId=${item.dishId}`
        : `/pages/materialDetail/index?materialId=${item.materialId}`
    )
  }
  const initScrollView = useCallback(() => {
    return new Promise(resolve => {
      let view = Taro.createSelectorQuery().select('#scroll-panel')
      view
        .boundingClientRect(res => {
          setScrollTop(res.top)
          Taro.nextTick(() => {
            // @ts-ignore
            resolve()
          })
        })
        .exec()
    })
  }, [])
  const getElementTop = useCallback(() => {
    new Promise(resolve => {
      let view = Taro.createSelectorQuery().selectAll('.main-list')
      view
        .boundingClientRect(data => {
          resolve(data)
        })
        .exec()
    }).then((res: any) => {
      let topMap = res.map((item, index) => {
        return {
          [seriesList[index].seriesId]: item.top - scrollTop /* 减去滚动容器距离顶部的距离 */
        }
      })
      setTopMap(topMap)
    })
  }, [])
  const onScroll = useCallback(e => {
    let top = e.detail.scrollTop
    let index = 0
    /* 查找当前滚动距离 */
    // for (let i = (topArr.length - 1); i >= 0; i--) {
    //     /* 在部分安卓设备上，因手机逻辑分辨率与rpx单位计算不是整数，滚动距离与有误差，增加2px来完善该问题 */
    //     if ((top + 2) >= topArr[i]) {
    //         index = i;
    //         break;
    //     }
    // }
    // console.log('fyq'+index)
    // let leftIndex = (index < 0 ? 0 : index);

    // this.setState({
    //     leftIndex,
    //     leftIntoView: `left-${leftIndex > 3 ? (leftIndex - 3) : 0}`
    // })
  }, [])
  return (
    <View className='content flex-y' style={{ top: `${bottom + 19}px`, height: `calc(100% - ${bottom + 19}px)` }}>
      <Banner bannerType={bannerType} />
      <View className='flex-grow-y flex-x'>
        <View className='tab-bg'>
          <View className='tab'>
            {seriesList.map(item => (
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
        <ScrollView
          scrollY
          className='flex-grow-x'
          scrollIntoView={`series${subCurrent}`}
          id='scroll-panel'
          onScroll={onScroll}
        >
          {list.map(item => (
            <View className='main-list'>
              <View className='series-title' id={`series${item.seriesId}`}>
                <Text>{item.seriesName}</Text>
                <Text className='dashed-line' />
              </View>
              <View className='list'>
                {list.map(item => {
                  let isNew = false
                  const { newDish, newMaterial, newBeginTime, newEndTime } = item
                  if (newDish === 1 || newMaterial === 1) {
                    const nowTime = getTimestamp()
                    if (nowTime > getTimestamp(newBeginTime) && nowTime < getTimestamp(newEndTime)) {
                      isNew = true
                    }
                  }
                  return (
                    <View
                      key={item.dishId || item.materialId}
                      className='list-item flex-x'
                      onClick={() => handleClick(item)}
                    >
                      <Image src={item.dishFace || item.materialFace} className='face' />
                      <View className='flex-grow-x flex-y'>
                        <View className='name-wrapper'>
                          <Text className='name two-line-text'>{item.dishName || item.materialName}</Text>
                          {isNew && <Text className='new'>新品</Text>}
                        </View>
                        <Text className='desc'>{item.dishDesc || item.materialDesc}</Text>
                      </View>
                    </View>
                  )
                })}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

export default React.memo(Index)
