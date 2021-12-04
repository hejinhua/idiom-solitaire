import React, { useMemo, useEffect, useState, Fragment } from 'react'
import { View, ScrollView, Text } from '@tarojs/components'
import Banner from '@/components/Banner'
import { getMaterialSeriesList, getMaterialList } from '@/services/api'
import { getGlobalData } from '@/utils/global-data'
import Tab from '@/components/Tab'
import { SeriesType } from '@/constants/commonTypes'
import DishList from '@/components/DishList'

import './index.styl'

const Index = () => {
  const { bottom, height, top } = useMemo(() => getGlobalData('capsuleInfo'), [])
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
      if (!values[1]) {
        clickTab(seriesList[0])
      } else {
        setCurrent(-1)
        setData([{ seriesId: -1, seriesName: '新品首发', list: newList }])
      }
    })
  }, [setSeriesList])
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
      const data = (seriesList.find(item => item.seriesId === seriesPid) || {}).materialSeriesList || []
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
      <View className='contentm flex-y' style={{ top: `${bottom + 19}px`, height: `calc(100% - ${bottom + 19}px)` }}>
        <Banner bannerType={2} />
        <View className='flex-grow-y flex-x'>
          <Tab
            list={seriesList}
            current={current}
            subCurrent={subCurrent}
            clickTab={clickTab}
            clickSubTab={clickSubTab}
          />
          <ScrollView scrollY className='flex-grow-x' scrollIntoView={`series${subCurrent}`}>
            {data.map(item => (
              <Fragment>
                <View className='series-title' id={`series${item.seriesId}`}>
                  <Text>{item.seriesName}</Text>
                  <Text className='dashed-line' />
                </View>
                <DishList list={item?.list} />
              </Fragment>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

export default Index
