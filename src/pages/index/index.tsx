import React, { useMemo, useEffect, useState } from 'react'
import { View, ScrollView } from '@tarojs/components'
import Banner from '@/components/Banner'
import { getDishSeriesList, getDishList } from '@/services/api'
import { getGlobalData } from '@/utils/global-data'
import Tab from '@/components/Tab'
import { DishSeriesType, DishType } from '@/constants/commonTypes'
import { pageSize } from '@/constants/constants'

import './index.styl'
import DishList from '@/components/DishList'

let pageNo = 1
const Index = () => {
  const { bottom } = useMemo(() => getGlobalData('capsuleInfo'), [])
  const [seriesList, setSeriesList] = useState<Array<DishSeriesType>>([])
  const [dishList, setDishList] = useState<Array<DishType>>([])
  const [current, setCurrent] = useState(-1)
  const [subCurrent, setSubCurrent] = useState(-1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    getDishSeriesList().then(res => {
      setSeriesList(res?.data || [])
      if (res?.data?.length > 0) {
        clickTab(res.data[0])
      }
    })
  }, [setSeriesList])
  const clickTab = item => {
    const { seriesId, dishSeriesList } = item
    setCurrent(seriesId)
    setSubCurrent(dishSeriesList[0]?.seriesId)
    loadDishList(seriesId, dishSeriesList[0]?.seriesId)
  }
  const clickSubTab = item => {
    setSubCurrent(item.seriesId)
    pageNo = 1
    loadDishList(current, item.seriesId)
  }
  const loadDishList = (seriesPid, seriesId) => {
    getDishList({ seriesPid, seriesId, pageNo, pageSize }).then(res => {
      const list = res?.data?.list || []
      setDishList(list)
      setHasMore(list.length === pageNo)
    })
  }
  const loadMore = () => {
    pageNo++
    if (hasMore) {
      loadDishList(current, subCurrent)
    }
  }
  return (
    <View className='wrapper'>
      <View className='bg' />
      <View className='content' style={{ top: `${bottom + 19}px` }}>
        <Banner bannerType={1} />
        <View className='flex-x'>
          <Tab
            list={seriesList}
            current={current}
            subCurrent={subCurrent}
            clickTab={clickTab}
            clickSubTab={clickSubTab}
          />
          <ScrollView scrollY onScrollToLower={loadMore} className='flex-grow-x'>
            <DishList list={dishList} />
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

export default Index
