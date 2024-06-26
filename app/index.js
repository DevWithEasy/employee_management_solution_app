import Constant from 'expo-constants';
import { useRouter } from "expo-router";
import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ui from '../assets/ui';
import AppText from '../components/AppText';
import ImageBackgroundScreen from '../components/ImageBackgroundScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAppStore from '../store/useStore';
import AppButton from '../components/AppButton';

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem('user')
      if (!user) {
        return router.push('/login')
      } else {
        setIsLoggedIn(true)
      }
    }
    getUser()
  }, [])

  return (
    <ImageBackgroundScreen>
      <ScrollView
        style={{
          paddingTop: Platform.OS === 'android' ? Constant.statusBarHeight : 0
        }}
        className='space-y-7'
      >
        <View>
          <Image
            source={require('../assets/logo.png')}
            className='mt-7 w-24 h-20 mx-auto'
          />
          <AppText
            styles='text-2xl font-bold text-center text-red-500'
          >
            S&B Nice Food Valley Limited
          </AppText>
          <AppText
            styles='text-center'
          >
            Employee Managemnt
          </AppText>
        </View>

        <View
          className='px-1 flex-row flex-wrap'
        >
          {
            ui.map((info, i) =>
              <TouchableOpacity
                key={i}
                className='w-1/2 p-1'
                onPress={() => router.push(info.path)}
              >
                <View
                  className='p-4 rounded justify-center items-center space-y-3 bg-white/50'
                >
                  <Image
                    source={info.image}
                    className='w-12 h-12 mx-auto'
                  />
                  <Text
                    style={{
                      color: info.textColor
                    }}
                  >
                    {info.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          }
        </View>
        <View
          className='absolute -top-5 right-3'
        >
          <AppButton
            title='Logout'
            btnStyle='px-4 bg-red-500 rounded-full'
            textStyle='text-white text-xs'
            onPress={async()=>{
              await AsyncStorage.removeItem('user')
              setIsLoggedIn(false)
              router.push('/login')
            }}
          />
        </View>
      </ScrollView>
    </ImageBackgroundScreen>
  );
}