import { View, Text, ScrollView, Platform, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import ImageBackgroundScreen from '../components/ImageBackgroundScreen'
import Constant from 'expo-constants';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import useAppStore from '../store/useStore';
import api_endpoint from '../utils/api';
import Loading from '../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import AppText from '../components/AppText';

export default function Login() {
    const router = useRouter()
    const { loading, setLoading } = useAppStore()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = () => {
        if (!email || !password) {
            return Alert.alert('Field is required', 'Please enter a valid email and password')
        }
        setLoading()
        fetch(`${api_endpoint}?v=login&email=${email}&password=${password}`)
            .then(res => res.json())
            .then(async (data) => {
                if (!data.success) {
                    Alert.alert('Login failed',data.message)
                } else {
                    await AsyncStorage.setItem('user', JSON.stringify(data.user))
                    router.push('/')
                }
                setLoading()
            })
            .catch(err => {
                console.log(err)
                setLoading()
            })
    }
    useEffect(() => {
        const getUser = async () => {
          const user = await AsyncStorage.getItem('user')
          console.log(user)
          if (user) {
            return router.push('/')
          }
        }
        getUser()
      })
    return (
        <ImageBackgroundScreen>
            <View
                style={{
                    paddingTop: Platform.OS === 'android' ? Constant.statusBarHeight : 0
                }}
                className='flex-1items-center'
            >
                <View
                    className='w-full px-4 pt-16 space-y-5'
                >
                    <View
                        className='flex-col items-center'
                    >
                        <Image
                        source={require('../assets/login_user.png')}
                        className='w-20 h-20 mx-auto'
                    />
                    <AppText
                        styles='text-center text-xl font-bold'
                    >
                        Administration
                    </AppText>
                    </View>
                    
                    <View>
                        <AppInput
                            value={email}
                            placeholder='Email or Phone'
                            onChangeText={setEmail}
                            styles='w-full px-4 py-2 my-1 border border-gray-400 rounded-full'
                        />
                        <AppInput
                            value={password}
                            placeholder='Password'
                            onChangeText={setPassword}
                            styles='w-full px-4 py-2 my-1 border border-gray-400 rounded-full'
                        />
                        <AppButton
                            title='Login'
                            btnStyle='py-3 mt-1 bg-blue-500 rounded-full'
                            textStyle='text-white text-center'
                            onPress={handleSubmit}
                        />
                    </View>
                </View>
                <Loading
                    visible={loading}
                    setVisible={setLoading}
                />
            </View>
        </ImageBackgroundScreen>
    )
}