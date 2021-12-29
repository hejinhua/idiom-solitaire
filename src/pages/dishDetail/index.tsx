import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { useRouter, setNavigationBarTitle } from '@tarojs/taro'
import { getDishDetail } from '@/services/api'
import { DishDetailType } from '@/constants/commonTypes'
import DetailBanner from '@/components/DetailBanner'
import Card from '@/components/Card'
import Button from '@/components/Button'
import { customerService, formatPrice, toPage } from '@/utils/utils'
import { baseCDNUrl } from '@/services/baseUrl'

import './index.styl'
import serviceIcon from '@/assets/icons/contact-grey.png'

const Index = () => {
  const { dishId } = useRouter()?.params || {}
  const [data, setData] = useState<DishDetailType>()
  useEffect(() => {
    getDishDetail({ dishId }).then(res => {
      setNavigationBarTitle({ title: res.data?.dishName })
      setData(res.data)
    })
  }, [])
  const handleOrder = () => {
    toPage(`/pages/order/index?dishName=${data?.dishName}`)
  }
  return data ? (
    <View className='wrapper'>
      <DetailBanner banner={data.dishBanner} videoFace={data.videoFace} videoUrl={data.videoUrl} />
      <View className='name-wrapper flex-y'>
        <Text className='dish-name'>{data.dishName}</Text>
        {data.dishDesc && <Text className='dish-desc'>{data.dishDesc}</Text>}
      </View>
      <Card title='特点'>
        {data.areaKey && (
          <View className='special'>
            <Text>地域</Text>
            <Text className='red-f'>{data.areaKey}</Text>
          </View>
        )}
        {data.flavor && (
          <View className='special'>
            <Text>风味</Text>
            <Text className='red-f'>{data.flavor}</Text>
          </View>
        )}
      </Card>
      <Card title='材料' showMore>
        <View className='table-header'>
          <Text className='w75'>主食材</Text>
          <Text className='w60'>售价</Text>
          <Text className='w60'>数量</Text>
          <Text className='w75'>成本价(元)</Text>
        </View>
        {data.materialTypes.map(item => (
          <View key={item.code} className='table-row'>
            <Text className='flex-grow-x bold border-r'>{item.value}</Text>
            <View>
              {item.materialList.map(item => (
                <View key={item.dishId} className='w270 flex-center'>
                  <Text className={`w75 ${item.materialId ? 'link' : ''}`}>{item.materialName}</Text>
                  {item.salePrice ? (
                    <Text className='w60'>{formatPrice(item.salePrice)}</Text>
                  ) : (
                    <Text className='w60 link'>查看了解</Text>
                  )}
                  <Text className='w60'>{item.materialQuantity + item.materialUnit}</Text>
                  {item.cost ? (
                    <Text className='w60'>{formatPrice(item.cost)}</Text>
                  ) : (
                    <Text className='w60 link'>查看了解</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
        <View className='table-row'>
          <Text className='flex-grow-x bold border-r'>建议售价</Text>
          {data.price ? (
            <Text className='w270'>{formatPrice(data.price)}</Text>
          ) : (
            <Text className='w270 link'>查看了解</Text>
          )}
        </View>
        <View className='table-row'>
          <Text className='flex-grow-x bold border-r'>毛利润</Text>
          {data.grossProfit ? (
            <Text className='w270'>{formatPrice(data.grossProfit)}</Text>
          ) : (
            <Text className='w270 link'>查看了解</Text>
          )}
        </View>
      </Card>
      <Card title='操作步骤'>
        {data.productionStep?.split(',').map(item => (
          <Image key={item} src={baseCDNUrl + item} className='stepImg' />
        ))}
      </Card>
      <Card title='应用场景'>
        <ScrollView scrollX className='relation-view'>
          {data.relationList.map(item => (
            <View key={item.relationId} className='relation-item'>
              <Image src={baseCDNUrl + item.relationImg} className='relation-img' />
              <Text className='relation-text'>{item.relationName}</Text>
            </View>
          ))}
        </ScrollView>
      </Card>
      <View className='footer'>
        <View className='service' onClick={customerService}>
          <Image src={serviceIcon} className='service-icon' />
          <Text>客服</Text>
        </View>
        <Button text='预约试菜' size='normal' onClick={handleOrder} style='flex-grow:1' />
      </View>
    </View>
  ) : null
}

export default Index
