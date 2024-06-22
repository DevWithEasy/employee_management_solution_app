import { TextInput } from 'react-native'
import React from 'react'
import cn from '../utils/cn'

export default function AppInput({value,onChangeText,placeholder,styles}) {
  return (
    <TextInput
        value={value}
        className={cn('border',styles)}
        placeholder={placeholder}
        onChangeText={onChangeText}
    />
  )
}