import Constant from 'expo-constants';
import { Link } from "expo-router";
import { Image, Platform, ScrollView, Text } from "react-native";

export default function Page() {
  return (
    <ScrollView
      style={{
        paddingTop: Platform.OS === 'android' ? Constant.statusBarHeight : 0
      }}
      className='flex-1 bg-white'
    >
      <Image
        source={require('../assets/logo.png')}
        className='w-48 h-36 mx-auto'
      />
      <Link
        href='/sections'
      >
        <Text>Section</Text>
      </Link>
      <Link
        href='/add_employee'
      >
        <Text>Add Employee</Text>
      </Link>
    </ScrollView>
  );
}