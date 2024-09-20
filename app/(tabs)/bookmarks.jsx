import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalProvider';
import useAppwrite from '../../lib/useAppWrite';
import { getCurrentUser } from '../../lib/appwrite';
import { usePathname } from 'expo-router';
const Bookmarks = () => {
  const {isLoading, setIsLoading} = useGlobalContext();
  if (isLoading) {
    return <View className="bg-primary h-full w-full justify-center items-center">
    <ActivityIndicator size="large" color="#ff9001"/>
  </View>
  }
  const pathname = usePathname();
  const {data: user, refetch} = useAppwrite(getCurrentUser);
  const posts = user.videos_liked;
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
   
    onRefresh();

  }, [pathname]);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    // Recall Videos to see if any new videos have appeared
    setRefreshing(false);
  }
  useEffect(()=> {
    setIsLoading(true);
    onRefresh();
    setIsLoading(false);
  },[])
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item)=> item.$id}
        renderItem={({item})=> (
         <VideoCard video={item} onRefresh={onRefresh}/>
        )}
        ListHeaderComponent={()=>(
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
              <Text className="font-pmedium text-sm text-gray-100">Bookmarks</Text>
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
            title="No Bookmarks Found"
            subtitle="Your bookmarked videos will be found here"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Bookmarks