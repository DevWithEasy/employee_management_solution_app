import { View, Text } from 'react-native'
import React from 'react'
import cn from '../utils/cn'

export default function AppText({children,styles,...otherProps}) {
  return (
    <Text
        className={cn('',styles)}
        {...otherProps}
    >
        {children}
        </Text>
  )
}