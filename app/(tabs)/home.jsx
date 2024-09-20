import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import {getAllPosts, getLatestPosts} from '../../lib/appwrite'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import useAppwrite from '../../lib/useAppWrite'
import { usePathname } from 'expo-router';
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalProvider';

const Home = () => {
  const {isLoading, setIsLoading} = useGlobalContext();
  if (isLoading) {
    return <View className="bg-primary h-full w-full justify-center items-center">
    <ActivityIndicator size="large" color="#ff9001"/>
  </View>
  }
  const pathname = usePathname();
  const {user} = useGlobalContext();
  const {data: posts, refetch} = useAppwrite(getAllPosts);
  const {data: latestPosts} = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    // Recall Videos to see if any new videos have appeared
    setRefreshing(false);
  }
  useEffect(() => {
    setIsLoading(true)
    onRefresh();
    setIsLoading(false)

  }, [pathname]);
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
              <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
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
          
            <SearchInput />     
    
            <View className="w-full flex-1  pt-5 pb-8">
  
              <Trending posts={latestPosts ?? []} />
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