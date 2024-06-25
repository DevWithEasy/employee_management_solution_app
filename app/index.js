import Constant from 'expo-constants';
import { useRouter } from "expo-router";
import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ui from '../assets/ui';
import AppText from '../components/AppText';
import ImageBackgroundScreen from '../components/ImageBackgroundScreen';

export default function Page() {
  const router = useRouter()
  return (
    <ImageBackgroundScreen>
      <ScrollView
      style={{
        paddingTop: Platform.OS === 'android' ? Constant.statusBarHeight : 0
      }}
      className='space-y-10'
    >
      <View>
        <Image
        source={require('../assets/logo.png')}
        className='mt-5 w-24 h-20 mx-auto'
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
              onPress={()=>router.push(info.path)}
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
                  color : info.textColor
                }}
                >
                  {info.title}
                  </Text>
              </View>
            </TouchableOpacity>
          )
        }
      </View>
    </ScrollView>
    </ImageBackgroundScreen>
  );
}