import { View, Text, Image } from 'react-native'
import React from 'react'
import ImageBackgroundScreen from './ImageBackgroundScreen'
import AppText from './AppText'
import AppButton from './AppButton'
import { useRouter } from 'expo-router'

export default function LoginFirst() {
    const router = useRouter()
    return (
        <ImageBackgroundScreen>
            <View
                className='flex-1 justify-center items-center'
            >
                <View
                    className='bg-white/30 p-4 flex-col items-center space-y-2 rounded-md'
                >
                    <Image
                        source={require('../assets/admin.png')}
                        className='h-20 w-20'
                    />
                    <AppText>Administration Login Required</AppText>
                    <AppButton
                        title='Login'
                        btnStyle='mt-3 px-10 bg-blue-500 rounded-full'
                        textStyle='text-white'
                        onPress={()=>{
                            router.push('/login')
                        }}
                    />
                </View>

            </View>
        </ImageBackgroundScreen>
    )
}