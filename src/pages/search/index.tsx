import React, { Fragment, useMemo, useState } from 'react'
import { View, Text, Input, Image, ScrollView } from '@tarojs/components'

import './index.styl'
import { getGlobalData } from '@/utils/global-data'
import { setStack, toPage } from '@/utils/utils'
import Taro from '@tarojs/taro'
import { DishType, MaterialType } from '@/constants/commonTypes'
import { getDishList, getMaterialList } from '@/services/api'
import DishList from '@/components/DishList'
import { pageSize } from '@/constants/constants'
import Button from '@/components/Button'

let pageNo = 1
const Index = () => {
  const { height, top } = useMemo(() => getGlobalData('capsuleInfo'), [])
  const [value, setValue] = useState('')
  const [type, setType] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [noResult, setNoResult] = useState(false)
  const [list, setList] = useState<Array<DishType> | Array<MaterialType>>([])
  const searchHistoryList = Taro.getStorageSync('searchHistoryList')
  const onChange = e => {
    const { value } = e.detail
    setValue(value)
    handleSearch(value)
  }
  const handleSearch = value => {
    if (!value) {
      setList([])
      return
    }
    setStack('searchHistoryList', 12, value)
    pageNo = 1
    setHasMore(true)
    setNoResult(false)
    loadList(value)
  }
  const loadList = value => {
    let api = getDishList
    let params: any = { pageNo, pageSize }
    if (type === 1) {
      params.dishName = value
    } else {
      params.materialName = value
      api = getMaterialList
    }
    api(params).then(res => {
      let list = res.data?.list || []
      setHasMore(list.length === pageSize)
      setList(list)
      setNoResult(list.length === 0)
    })
  }
  const handleType = type => {
    setType(type)
    handleSearch(value)
  }
  const loadMore = () => {
    if (hasMore) {
      pageNo++
      loadList(value)
    }
  }
  const handleHistory = value => {
    setValue(value)
    handleSearch(value)
  }
  return (
    <View className='search flex-y'>
      <View className='bg' />
      <View className='flex-center title' style={`margin-top: ${top}px; height: ${height}px;`}>
        我的
      </View>
      <View className='body flex-grow-y flex-y'>
        <View className='flex-x'>
          <View className='search-wrapper flex-x flex-grow-x'>
            <Image src='' className='search-icon' />
            <Input
              placeholder='搜索'
              type='text'
              className='search-input flex-grow-x'
              value={value}
              onInput={onChange}
              maxlength={30}
              onConfirm={handleSearch}
            />
          </View>
          <Text className='search-text'>搜索</Text>
        </View>
        {searchHistoryList && (
          <Fragment>
            <View className='flex-between history'>
              <Text>搜索历史</Text>
              <Image src='' className='search-icon' />
            </View>
            <View className='history-wrapper'>
              {searchHistoryList.map(item => (
                <View key={item} className='history-text' onClick={() => handleHistory(item)}>
                  {item}
                </View>
              ))}
            </View>
          </Fragment>
        )}
        {list.length > 0 && (
          <View className='flex-grow-y'>
            <View className='tab'>
              <View className={`${type === 1 ? 'active' : ''}`} onClick={() => handleType(1)}>
                <Text>菜品</Text>
              </View>
              <View className={`${type === 2 ? 'active' : ''}`} onClick={() => handleType(2)}>
                <Text>原料</Text>
              </View>
            </View>
            <ScrollView scrollY className='scroll-view' onScrollToLower={loadMore}>
              <DishList list={list} />
            </ScrollView>
          </View>
        )}
        {noResult && (
          <View className='flex-grow-y flex-y flex-center'>
            <Text>搜索暂无结果</Text>
            <Text>前往菜单查看更多好物</Text>
            <Button text='前往菜单' size='normal' style='width: 160px;' onClick={() => toPage('/pages/index/index')} />
          </View>
        )}
      </View>
    </View>
  )
}

export default Index
