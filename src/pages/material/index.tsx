import React, { useMemo, useEffect, useState } from 'react'
import { View, ScrollView } from '@tarojs/components'
import Banner from '@/components/Banner'
import { getMaterialSeriesList, getMaterialList } from '@/services/api'
import { getGlobalData } from '@/utils/global-data'
import Tab from '@/components/Tab'
import { SeriesType, DishType } from '@/constants/commonTypes'
import { pageSize } from '@/constants/constants'
import DishList from '@/components/DishList'

import './index.styl'

let pageNo = 1
const Index = () => {
  const { bottom } = useMemo(() => getGlobalData('capsuleInfo'), [])
  const [seriesList, setSeriesList] = useState<Array<SeriesType>>([])
  const [materialList, setMaterialList] = useState<Array<DishType>>([])
  const [current, setCurrent] = useState<number | undefined>()
  const [subCurrent, setSubCurrent] = useState<number | undefined>()
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    pageNo = 1
    Promise.all([getMaterialSeriesList(), getMaterialList({ pageNo, pageSize, newMaterial: 1 })]).then(values => {
      let seriesList = values[0]?.data || []
      let newList = values[1]?.data?.list || []
      if (newList?.length > 0) {
        seriesList.unshift({ seriesId: -1, seriesName: '新品首发' })
      }
      setSeriesList(seriesList)
      if (!values[1]) {
        clickTab(seriesList[0])
      } else {
        setCurrent(-1)
        setMaterialList(newList)
        setHasMore(newList.length === pageNo)
      }
    })
  }, [setSeriesList])
  const clickTab = item => {
    setHasMore(true)
    pageNo = 1
    const { seriesId, materialSeriesList } = item
    setCurrent(seriesId)
    let temp = materialSeriesList ? materialSeriesList[0] : null
    if (materialSeriesList && materialSeriesList[0]?.seriesId) {
      temp = materialSeriesList[0]?.seriesId
    }
    setSubCurrent(temp)
    loadMaterialList(seriesId, temp)
  }
  const clickSubTab = item => {
    setHasMore(true)
    setSubCurrent(item.seriesId)
    pageNo = 1
    loadMaterialList(current, item.seriesId)
  }
  const loadMaterialList = (seriesPid, seriesId) => {
    let params: any = { pageNo, pageSize }
    if (seriesPid === -1) {
      params.newMaterial = 1
    } else {
      params.seriesPid = seriesPid
      seriesId && (params.seriesId = seriesId)
    }
    getMaterialList(params).then(res => {
      const list = res?.data?.list || []
      setMaterialList(list)
      setHasMore(list.length === pageNo)
    })
  }
  const loadMore = () => {
    if (hasMore) {
      pageNo++
      loadMaterialList(current, subCurrent)
    }
  }
  return (
    <View className='wrapper'>
      <View className='bg' />
      <View className='contentm' style={{ top: `${bottom + 19}px` }}>
        <Banner bannerType={2} />
        <View className='flex-x'>
          <Tab
            list={seriesList}
            current={current}
            subCurrent={subCurrent}
            clickTab={clickTab}
            clickSubTab={clickSubTab}
          />
          <ScrollView scrollY onScrollToLower={loadMore} className='flex-grow-x'>
            <DishList list={materialList} />
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

export default Index
