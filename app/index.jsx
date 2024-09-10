import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import {Link, useRootNavigationState} from 'expo-router'
import { StatusBar } from 'expo-status-bar';



const App = () => {
  
  return (
    <View className="flex flex-1 items-center justify-center bg-white text-3xl">
      <Text className="text-3xl font-pblack">AiStrology</Text>
      <StatusBar style="auto" />
      <Link href="/home" style={{ color: 'blue'}}>Go to Home</Link>
    </View>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})