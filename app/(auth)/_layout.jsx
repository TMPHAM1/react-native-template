import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import {Stack} from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
const AuthLayout = () => {
  const {isLoading} = useGlobalContext();
  if (isLoading) {
    return (
        <View className="bg-primary">
          <ActivityIndicator size="large" className="text-secondary-100"/>
        </View>
    )
  }
  return (
    <>
    <Stack options={{
      headerShown: false,
    }}>
       <Stack.Screen name="sign-in"
       options={{
         headerShown: false
       }}/>
        <Stack.Screen name="sign-up"
       options={{
         headerShown: false
       }}/>
    </Stack>
    <StatusBar backgroundColor="#161622" />
    </>
  )
}

export default AuthLayout