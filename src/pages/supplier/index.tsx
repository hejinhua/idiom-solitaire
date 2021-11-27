import React from 'react'
import { View, Text } from '@tarojs/components'
import { getGlobalData } from '@/utils/global-data'
import { useRouter } from '@tarojs/taro'
import { SupplierType } from '@/constants/commonTypes'

import './index.styl'

const Index = () => {
  const { materialName } = useRouter()?.params || {}
  const supplierList: Array<SupplierType> = getGlobalData('supplierList') || []
  return (
    <View className='supplier'>
      {supplierList.map(item => (
        <View key={item.supplierId} className='supplier-item flex-y'>
          <Text className='title'>{materialName}</Text>
          <Text>供应商：{item.supplierName}</Text>
          <Text>
            价格：{item.salePrice}元/{item.materialUnit}
          </Text>
          <Text>联系电话：{item.supplierPhone}</Text>
          <Text>地址：{item.supplierAddress}</Text>
        </View>
      ))}
    </View>
  )
}

export default Index
