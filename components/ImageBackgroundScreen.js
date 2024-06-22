import { ImageBackground } from 'react-native'
import React from 'react'

export default function ImageBackgroundScreen({ children }) {
  return (
    <ImageBackground
      source={require('../assets/bg.jpg')}
      className='flex-1'
      blurRadius={8}
    >
      {children}
    </ImageBackground>
  )
}