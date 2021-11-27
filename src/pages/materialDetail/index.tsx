import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { useRouter, setNavigationBarTitle } from '@tarojs/taro'
import { getMaterialDetail } from '@/services/api'
import { MaterialDetailType } from '@/constants/commonTypes'
import DetailBanner from '@/components/DetailBanner'
import Card from '@/components/Card'
import Button from '@/components/Button'
import { toPage } from '@/utils/utils'
import QrModal from '@/components/QrModal'

import './index.styl'
import { setGlobalData } from '@/utils/global-data'

const Index = () => {
  const { materialId } = useRouter()?.params || {}
  const [data, setData] = useState<MaterialDetailType>()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    getMaterialDetail({ materialId }).then(res => {
      setNavigationBarTitle({ title: res.data?.materialName })
      setData(res.data)
    })
  }, [])
  const handleDish = id => {
    if (id === 0) return
    toPage(`/pages/dishDetail/index?dishId=${id}`)
  }
  const toogleVisible = () => {
    setVisible(!visible)
  }
  const handleSupplier = () => {
    setGlobalData('supplierList', data?.supplierList)
    toPage('/pages/supplier/index')
  }
  return data ? (
    <View className='wrapper2'>
      <DetailBanner banner={data.materialBanner} videoFace={data.videoFace} videoUrl={data.videoUrl} />
      <View className='name-wrapper flex-y'>
        <Text className='dish-name'>{data.materialName}</Text>
        {data.materialDesc && <Text className='dish-desc'>{data.materialDesc}</Text>}
      </View>
      <Card title='原料信息'>
        <View className='special'>
          <Text>供应商</Text>
          <Text className='link' onClick={data.supplierList ? handleSupplier : toogleVisible}>
            查看了解
          </Text>
        </View>
        <View className='special'>
          <Text>成本</Text>
          <Text className='link' onClick={data.supplierList ? handleSupplier : toogleVisible}>
            查看了解
          </Text>
        </View>
        {data.saveCondition && (
          <View className='special'>
            <Text>保存条件</Text>
            <Text>{data.saveCondition}</Text>
          </View>
        )}
        {data.savePeriod && (
          <View className='special'>
            <Text>保存时间</Text>
            <Text>{data.savePeriod}</Text>
          </View>
        )}
      </Card>
      <Card title='应用菜品'>
        <ScrollView scrollX className='relation-view'>
          {data.relationList?.map(item => (
            <View key={item.relationId} className='relation-item' onClick={() => handleDish(item.linkId)}>
              <Image src={item.relationImg} className='relation-img' />
              <Text className='relation-text'>{item.relationName}</Text>
            </View>
          ))}
        </ScrollView>
      </Card>
      <View className='detail flex-center'>
        <Text>商品详情</Text>
      </View>
      {data?.materialDetail?.split(',').map(item => (
        <Image key={item} src={item} className='detail-img' />
      ))}
      <View className='footer'>
        <Button text='了解更多供应信息' size='normal' onClick={data.supplierList ? handleSupplier : toogleVisible} />
      </View>
      <QrModal visible={visible} onClose={toogleVisible} />
    </View>
  ) : null
}

export default Index
