import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import cn from '../utils/cn'

export default function AppButton({title, textStyle,btnStyle,onPress}) {
  return (
    <TouchableOpacity
        onPress={onPress}
        className={cn('p-2',btnStyle)}
    >
      <Text
        className={cn('w-full',textStyle)}
      >
        {title}
        </Text>
    </TouchableOpacity>
  )
}