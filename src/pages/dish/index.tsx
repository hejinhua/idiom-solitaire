import React, { useMemo, useEffect, useState } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { getDishSeriesList, getDishList } from '@/services/api'
import { getGlobalData } from '@/utils/global-data'
import TabList from '@/components/TabList'
import { SeriesType } from '@/constants/commonTypes'

import './index.styl'
import logoIcon from '@/assets/icons/logo.png'

const Index = () => {
  const { top, height } = useMemo(() => getGlobalData('capsuleInfo'), [])
  const [seriesList, setSeriesList] = useState<Array<SeriesType>>([])
  const [data, setData] = useState<any>([])
  const [current, setCurrent] = useState<number | undefined>()
  const [subCurrent, setSubCurrent] = useState<number | undefined>()

  useEffect(() => {
    Promise.all([getDishSeriesList(), getDishList({ newDish: 1 })]).then(values => {
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
        setData([{ seriesId: -1, seriesName: '新品首发', list: newList }])
      }
    })
  }, [setSeriesList])
  const clickTab = item => {
    const { seriesId, dishSeriesList } = item
    setCurrent(seriesId)
    let temp = dishSeriesList ? dishSeriesList[0] : null
    if (dishSeriesList && dishSeriesList[0]?.seriesId) {
      temp = dishSeriesList[0]?.seriesId
    }
    setSubCurrent(temp)
    seriesId === -1 ? loadNewList() : loadDishList(seriesId)
  }
  const clickSubTab = item => {
    setSubCurrent(item.seriesId)
    loadDishList(current)
  }
  const loadDishList = seriesPid => {
    getDishList({ seriesPid }).then(res => {
      const list = res?.data?.list || []
      const listMap = list.reduce((result, item) => {
        const seriesIds = item.seriesId.split(',')
        seriesIds.forEach(id => {
          result[id] = [...(result[id] || []), item]
        })
        return result
      }, {})
      const data = (seriesList.find(item => item.seriesId === seriesPid) || {}).dishSeriesList || []
      // @ts-ignore
      data.forEach(item => (item.list = listMap[item.seriesId] || []))
      setData(data)
    })
  }
  const loadNewList = () => {
    getDishList({ newDish: 1 }).then(res => {
      const list = res?.data?.list || []
      setData([{ seriesId: -1, seriesName: '新品首发', list }])
    })
  }
  return (
    <View className='wrapper'>
      <View className='bg'>
        <View className='title' style={`padding-top: ${top}px; height: ${height}px`}>
          <Image src={logoIcon} className='logo' />
          <View className='logo-text flex-y'>
            <Text>多味研创</Text>
          </View>
        </View>
      </View>
      <TabList
        seriesList={seriesList}
        current={current}
        subCurrent={subCurrent}
        clickSubTab={clickSubTab}
        clickTab={clickTab}
        list={data}
        bannerType={1}
      />
    </View>
  )
}

export default Index
