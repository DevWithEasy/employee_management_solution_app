import { View, Text, TextInput } from 'react-native'
import React from 'react'
import cn from '../utils/cn'

export default function AppInput({onChangeText,placeholder,styles}) {
  return (
    <TextInput
        className={cn('border',styles)}
        placeholder={placeholder}
        onChangeText={onChangeText}
    />
  )
}