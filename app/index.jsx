import { Text, ScrollView, Image, View, ActivityIndicator } from 'react-native'
import React from 'react';
import { Link, Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';

import 'react-native-url-polyfill/auto'
import { useGlobalContext } from '@/context/GlobalProvider';



const App = () => {
  const {isLoading, isLoggedIn} = useGlobalContext();
  if (isLoading) {
    return <View className="bg-primary h-full w-full justify-center items-center">
    <ActivityIndicator size="large" color="#ff9001"/>
  </View>
  }
  if (!isLoading && isLoggedIn) return <Redirect href="/home" />

  return (
    <SafeAreaView className='bg-primary min-h-[100vh]'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full justify-center items-center px-4'>
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="w-[380px] h-[300px]"
            resizeMode="contain"
          />
          <View>
            <Text className='text-3xl text-white font-bold text-center'>
              Discover Endless Posibilities with {' '}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className='text-sm text-gray-100 mt-7 text-center font-pregular'>Where Creativity meets innovation embark on a journey of limitless exploration with Aora</Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => (router.push('/sign-in'))}
            containerStyles="w-full mt-7"
            isLoading={false}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  )
}

export default App;
