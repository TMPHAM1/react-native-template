import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'

import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    // Recall Videos to see if any new videos have appeared
    setRefreshing(false);
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[]}
        keyExtractor={(item)=> item.$id}
        renderItem={({item})=> (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={()=>(
          <View className="my-4 p-4 space-y-6">
            <View className="justify-between items-start flex-row mb-2">
              <View>
              <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
              <Text className="text-2xl font-psemibold text-white">Tien</Text>
              </View>
              <View className="mt-1">
              <Image
              source={images.logoSmall}
              className="w-9 h-10"
              resizeMode='contain'
              ></Image>
            </View>
            </View>
          
            <SearchInput />     
    
            <View className="w-full  flex-1  pt-5 pb-8">
  
              <Trending posts={[] ?? []} />
            </View>


          </View>
  )}
        ListEmptyComponent={()=> (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos creaed yet"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home