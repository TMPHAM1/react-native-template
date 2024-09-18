import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Video, ResizeMode } from 'expo-av';
import { useRef } from 'react';

const zoomIn = {
  0: {
    scale: 0.9
  },
  1: {
    scale: 1.1
  }
}

const zoomOut = {
  0: {scale: 1},
  1: {scale: 0.9},
}

const TrendingItem = ({activeItem, item}) => {
  const [play, setPlay] = useState(false);  
  
  const videoRef = useRef(null)
 return (<Animatable.View
    className="mr-5"
    animation={activeItem === item.$id ? zoomIn : zoomOut}
    duration = {500}
  >
    {play ? ( 
      <Video source={{uri: "https://player.vimeo.com/video/949582778?h=d60220d68d"}} 
    ref={videoRef}
    className="w-52 h-72 rounded-[35px] my-3 overfldden  border-red border shadow-white/10"
    resizeMode={ResizeMode.COVER}
    useNativeControls
    shouldPlay
    isMuted={false}
    onPlaybackStatusUpdate={(status)=> {
      if(status.didJustFinish)
 {
  setPlay(false)
 }    }}
    />) : (
      <TouchableOpacity className="relative justify-center items-center"
      activeOpacity={0.7}
      onPress={()=> {setPlay(true)
      }}>
        <ImageBackground source={{uri: item.thumbnail}}
        className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40 "
        ></ImageBackground>
        <Image source={icons.play}
          className="w-12 h-12 absolute"
          resizeMode='contain'
        />
      </TouchableOpacity>
    )}
  </Animatable.View>)
}
import React, { useState } from 'react'
import { icons } from '../constants'

const Trending = ({posts}) => {
  if (!posts || posts.length === 0) {
    return null
  }
  const [activeItem, setActiveItem] = useState(posts[1]);
  const viewableItemsChanged = ({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }
  return (
    <View>
            <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>
              <FlatList
    data={posts}
    keyExtractor={(item)=> item.$id}
    renderItem={({item})=> (
        <TrendingItem activeItem={activeItem} item={item} />
)}
onViewableItemsChanged={viewableItemsChanged}
viewabilityConfig={{
  itemVisiblePercentThreshold: 70,
}}
contentOffset={{x: 170}}
    horizontal
/>
    </View>

  )
}

export default Trending