/*
 * @Author: hjh
 * @Date: 2021-11-20 17:51:12
 * @Description: 菜单/原料列表
 */
import React, { FC } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { DishType, MaterialType } from '@/constants/commonTypes'

import './index.styl'
import { toPage } from '@/utils/utils'

type Props = {
  list: Array<DishType> | Array<MaterialType>
}
const Index: FC<Props> = ({ list }) => {
  const handleClick = item => {
    toPage(
      item.dishId
        ? `/pages/dishDetail/index?dishId=${item.dishId}`
        : `/pages/materialDetail/index?materialId=${item.materialId}`
    )
  }
  return (
    <View className='list'>
      {list.map(item => (
        <View key={item.dishId || item.materialId} className='list-item flex-x' onClick={() => handleClick(item)}>
          <Image src={item.dishFace || item.materialFace} className='face' />
          <View className='flex-grow-x flex-y'>
            <Text className='name'>{item.dishName || item.materialName}</Text>
            <Text className='desc'>{item.dishDesc || item.materialDesc}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}

export default React.memo(Index)
