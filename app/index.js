import { Image, Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Constant from 'expo-constants'
import { Link } from "expo-router";

export default function Page() {
  return (
    <SafeAreaView
      style={{
        paddingTop : Platform.OS === 'android' ? Constant.statusBarHeight : 0
      }}
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
    </SafeAreaView>
  );
}