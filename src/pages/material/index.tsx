import React, { useMemo, useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { getMaterialSeriesList, getMaterialList } from '@/services/api'
import { getGlobalData } from '@/utils/global-data'
import TabList from '@/components/TabList'
import { SeriesType } from '@/constants/commonTypes'

import './index.styl'

const Index = () => {
  const { height, top } = useMemo(() => getGlobalData('capsuleInfo'), [])
  const [seriesList, setSeriesList] = useState<Array<SeriesType>>([])
  const [data, setData] = useState<any>([])
  const [current, setCurrent] = useState<number | undefined>()
  const [subCurrent, setSubCurrent] = useState<number | undefined>()

  useEffect(() => {
    Promise.all([getMaterialSeriesList(), getMaterialList({ newMaterial: 1 })]).then(values => {
      let seriesList = values[0]?.data || []
      let newList = values[1]?.data?.list || []
      if (newList?.length > 0) {
        seriesList.unshift({ seriesId: -1, seriesName: '新品首发' })
      }
      setSeriesList(seriesList)
      if (newList?.length > 0) {
        setCurrent(-1)
        setData([{ seriesId: -1, seriesName: '新品首发', list: newList }])
      }
    })
  }, [setSeriesList])
  useEffect(() => {
    if (seriesList?.length > 0 && seriesList[0].seriesId !== -1) {
      clickTab(seriesList[0])
    }
  }, [seriesList])
  const clickTab = item => {
    const { seriesId, materialSeriesList } = item
    setCurrent(seriesId)
    let temp = materialSeriesList ? materialSeriesList[0] : null
    if (materialSeriesList && materialSeriesList[0]?.seriesId) {
      temp = materialSeriesList[0]?.seriesId
    }
    setSubCurrent(temp)
    seriesId === -1 ? loadNewList() : loadMaterialList(seriesId)
  }
  const clickSubTab = item => {
    setSubCurrent(item.seriesId)
    loadMaterialList(current)
  }
  const loadMaterialList = seriesPid => {
    getMaterialList({ seriesPid }).then(res => {
      const list = res?.data?.list || []
      const listMap = list.reduce((result, item) => {
        const seriesIds = item.seriesId.split(',')
        seriesIds.forEach(id => {
          result[id] = [...(result[id] || []), item]
        })
        return result
      }, {})
      const currentSeries = seriesList.find(item => item.seriesId === seriesPid)
      const data = currentSeries?.materialSeriesList || [currentSeries]
      // @ts-ignore
      data.forEach(item => (item.list = listMap[item.seriesId] || []))
      setData(data)
    })
  }
  const loadNewList = () => {
    getMaterialList({ newMaterial: 1 }).then(res => {
      const list = res?.data?.list || []
      setData([{ seriesId: -1, seriesName: '新品首发', list }])
    })
  }
  return (
    <View className='wrapper'>
      <View className='bg' />
      <View className='flex-center title' style={`margin-top: ${top}px; height: ${height}px;`}>
        原料
      </View>
      <TabList
        seriesList={seriesList}
        current={current}
        subCurrent={subCurrent}
        clickSubTab={clickSubTab}
        clickTab={clickTab}
        list={data}
        bannerType={2}
      />
    </View>
  )
}

export default Index
