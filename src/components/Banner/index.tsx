/*
 * @Author: hjh
 * @Date: 2021-11-20 17:51:12
 * @Description: banner
 */
import React, { useState, useEffect } from 'react'
import { Swiper, SwiperItem, Image } from '@tarojs/components'
import { BannerType } from '@/constants/commonTypes'
import { getBannerList } from '@/services/api'

import './index.styl'

const Index = ({ bannerType }) => {
  const [list, setList] = useState<Array<BannerType>>([])
  useEffect(() => {
    getBannerList({ bannerType }).then(res => {
      setList(res?.data || [])
    })
  }, [setList])

  return (
    <Swiper className='banner'>
      {list.map(item => (
        <SwiperItem key={item.bannerId}>
          <Image src={item.bannerImg} />
        </SwiperItem>
      ))}
    </Swiper>
  )
}

export default React.memo(Index)
