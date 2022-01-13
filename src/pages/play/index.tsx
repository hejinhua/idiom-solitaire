import React, { useState, useEffect, useRef, useMemo } from 'react'
import { View, ScrollView, Text, Input, Image } from '@tarojs/components'

import './index.css'
import Taro from '@tarojs/taro'
import { cloudFunction } from '@/services/cloudFunction'
import defaultFace from '@/assets/icons/avatar.png'

const Index = () => {
  const [val, setVal] = useState('')
  const [tipNum, setTipNum] = useState(3)
  const [chance, setChance] = useState(3)
  const [desc, setDesc] = useState<any>()
  const [idiomList, setIdiomList] = useState<any>([])
  const [kbHeight, setKbHeight] = useState(0)
  const wLen = useRef(0)
  const userInfo = useMemo(() => Taro.getStorageSync('userInfo'), [])
  useEffect(() => {
    cloudFunction({ name: 'getRandomIdiom' }).then(res => {
      setIdiomList(res || [])
    })
  }, [])
  const handleChange = e => {
    const { value } = e.detail
    setVal(value.trim())
  }
  const handleConfirm = () => {
    if (!val) return
    if (idiomList.some(item => item.word === val)) {
      showErrorModal('请勿重复')
      countChance()
      return
    }
    cloudFunction({ name: 'checkAnswer', data: { idiom: idiomList[idiomList.length - 1], answer: val } }).then(res => {
      // @ts-ignore
      const { code, data, msg } = res
      if (code === 200) {
        let newList = [...idiomList, data]
        setIdiomList(newList)
        setVal('')
        next(data, newList)
      } else {
        countChance()
        showErrorModal(msg)
      }
    })
  }
  const showErrorModal = (msg, params = {}) => {
    Taro.showModal({
      title: '提示',
      content: msg,
      showCancel: false,
      ...params
    })
  }
  const next = (data, newList, second?) => {
    cloudFunction({ name: 'getNextIdiom', data: { idiom: data, idiomList: newList } }).then(res => {
      if (res) {
        setIdiomList([...newList, res])
        if (second) {
          next(res, [...newList, res])
        }
      } else {
        showErrorModal('你赢了～')
      }
    })
  }
  const handleTips = () => {
    if (tipNum === 0) return
    setTipNum(tipNum - 1)
    next(idiomList[idiomList.length - 1], idiomList, true)
  }
  const countChance = (type = '-', num = 1) => {
    let res = type === '+' ? chance + num : chance - num
    setChance(res >= 0 ? res : 0)
    if (res <= 0) {
      cloudFunction({ name: 'recordHistory', data: { idiomList, userInfo } })
      showErrorModal('game over', {
        confirmText: '重新开始',
        cancelText: '回主页',
        showCancel: true,
        success(res) {
          if (res.confirm) {
            Taro.redirectTo({
              url: '/pages/play/index'
            })
          } else {
            Taro.navigateBack({
              delta: 1
            })
          }
        }
      })
    }
  }
  return (
    <View className='wrapper'>
      <ScrollView
        scrollY
        className='scroll-view'
        scrollIntoView={`word${idiomList[idiomList.length - 1]?._id}`}
        style={`margin-top: ${idiomList?.length < wLen.current ? kbHeight : 0}px`}
      >
        {idiomList.map((item, index) => (
          <View key={item._id} className={index % 2 === 0 ? 'left-row' : 'right-row'} id={`word${item._id}`}>
            <Image src={index % 2 === 0 ? defaultFace : userInfo.avatarUrl} className='face' />
            <Text
              className={index % 2 === 0 ? 'left-word' : 'right-word'}
              onClick={() => {
                setDesc(item)
              }}
            >
              {item.word}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View className='action-wrapper'>
        <View className='flex-x'>
          <Text className='tips-btn' onClick={handleTips}>
            提示 {tipNum > 0 ? tipNum : ''}
          </Text>
          <Text
            className='tips-btn'
            onClick={() => {
              countChance('-', chance)
            }}
          >
            认输
          </Text>
          <Text className='tips-btn'>生命 {chance}</Text>
        </View>
        <View className='flex-x input-area'>
          <Input
            type='text'
            placeholder='输入成语'
            className='input flex-grow-x'
            onInput={handleChange}
            maxlength={16}
            onConfirm={handleConfirm}
            value={val}
            autoFocus
            onBlur={() => {
              setKbHeight(0)
            }}
            onKeyboardHeightChange={e => {
              const { height } = e.detail
              if (height > 0) {
                setKbHeight(height - 17)
                wLen.current = (height - 17) / 52
              }
            }}
          />
          <Text className='confirm' onClick={handleConfirm}>
            确认
          </Text>
        </View>
      </View>
      {desc && (
        <View
          className='desc-mask'
          onClick={() => {
            setDesc(null)
          }}
        >
          <View
            className='desc-wrapper'
            onClick={e => {
              e.stopPropagation()
            }}
          >
            <View className='desc-header bold'>{desc.word}</View>
            <View>拼音：{desc.pinyin}</View>
            <View>起源：{desc.derivation}</View>
            <View>解释：{desc.explanation}</View>
            <View>示例：{desc.example}</View>
          </View>
        </View>
      )}
    </View>
  )
}

export default Index
