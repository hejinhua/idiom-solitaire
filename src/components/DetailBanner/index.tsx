/*
 * @Author: hjh
 * @Date: 2021-11-20 17:51:12
 * @Description: 详情页banner
 */
import React, { useState, useEffect, FC } from 'react'
import { Swiper, SwiperItem, Image, Video } from '@tarojs/components'
import { baseCDNUrl } from '@/services/baseUrl'

import './index.styl'

type props = {
  banner: string
  videoFace?: string
  videoUrl?: string
}
const Index: FC<props> = ({ banner, videoFace, videoUrl }) => {
  const [list, setList] = useState<Array<string>>([])
  useEffect(() => {
    setList(banner?.split(','))
  }, [setList])

  return (
    <Swiper className='detail-banner'>
      {videoUrl && (
        <SwiperItem>
          <Video src={baseCDNUrl + videoUrl} poster={videoFace} className='img' />
        </SwiperItem>
      )}
      {list.map(item => (
        <SwiperItem key={item}>
          <Image src={baseCDNUrl + item} className='img' />
        </SwiperItem>
      ))}
    </Swiper>
  )
}

export default React.memo(Index)
