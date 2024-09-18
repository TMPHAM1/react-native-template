import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalProvider';
const Bookmarks = () => {
  const {user} = useGlobalContext();
  const posts = user.videos_liked;

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item)=> item.$id}
        renderItem={({item})=> (
         <VideoCard video={item}/>
        )}
        ListHeaderComponent={()=>(
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
              <Text className="font-pmedium text-sm text-gray-100">Here are your Bookmarks</Text>
              <Text className="text-2xl font-psemibold text-white">{user?.username}</Text>
              </View>
              <View className="mt-1.5">
              <Image
              source={images.logoSmall}
              className="w-9 h-10"
              resizeMode='contain'
              ></Image>
            </View>
            </View> 


          </View>
  )}
        ListEmptyComponent={()=> (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos creaed yet"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Bookmarks