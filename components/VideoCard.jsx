import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { icons } from '../constants';
import { Video, ResizeMode } from 'expo-av';
import { setLikedVideo, getCurrentUser } from '../lib/appwrite';
import Svg, { Path } from 'react-native-svg'
import useAppwrite from '../lib/useAppWrite';
import Animated, {useAnimatedStyle, useSharedValue, withSpring,} from 'react-native-reanimated';




const checkVideosLiked = (videosLiked, currentVideoId) => {
    if (!videosLiked) {
        return false
    }
    return videosLiked.some((item)=> {
        return item.$id === currentVideoId
    })
}

const VideoCard = ({video: 
    {title, thumbnail, video, $id: id,
        creator: {username, avatar}
    }}
) => {
    const {data: user, refetch} = useAppwrite(getCurrentUser);
    const {videos_liked} = user

    const scale = useSharedValue(1);

    // Animated style for the scaling effect
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    const [liked, setLiked] = useState(checkVideosLiked(videos_liked));
    const [play, setPlay] = useState(false);

    useEffect(()=> {
        const videoLiked = checkVideosLiked(videos_liked, id)
        setLiked(videoLiked)
    }, [videos_liked])

    const handleLiked = async () => {        
     await setLikedVideo(id, user.$id, !liked)

     scale.value = withSpring(1.5, {}, () => {
        scale.value = withSpring(1);
      });
    setLiked(!liked);
    
    }


  return (
   
    <View className="flex-col px-4 mb-14">
        <View className="flex-row gap-3 items-start">
            <View className="justify-center items-center flex-row flex-1">
                <View className="w-[46px] h-[46px] rounded-lg border inline border-secondary justify-center items-center p-0.5">
                    <Image 
                    source={{uri: avatar}}
                    resizeMode="cover"
                    className="w-full h-full rounded-lg" />
                </View>
                <View className="justify-center flex-1 ml-3 gap-y-1 inline">
                    <Text className="text-white text-sm font-psemibold" numberOfLines={1}>{title}</Text>
                    <Text className="text-gray-100 text-xs font-psemibold" numberOfLines={1}>{username}</Text>
                </View>
                </View>
                <TouchableOpacity onPress={handleLiked}>
                <View className="custom-heart">
                <Animated.View style={[animatedStyle]}>
                <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill={liked ? 'red' : 'none'}
            stroke={liked ? 'red' : 'gray'}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1A5.5 5.5 0 0 0 3.2 12l8.8 9 8.8-9a5.5 5.5 0 0 0 0-7.8z" />
          </Svg>
        </Animated.View>
                </View>
                </TouchableOpacity>
                <View className="pt-2"
                >
                    <Image 
                    source={icons.menu}
                    className="w-5 h-5"
                    resizeMode="contain" />
                </View>
            </View>
            {
                play ? (
                    <Video source={{uri: video}} 
                    className="w-full h-60 rounded-xl mt-"
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    isLooping={false}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    onPlaybackStatusUpdate={(status)=> {
                      if(status.didJustFinish)
                 {
                  setPlay(false)
                 }    }}
                    />
                ) : <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={()=> setPlay(true)}
                    className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
                    >
                    <Image
                        source={{uri: thumbnail}}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode="cover"

/>
                <Image source={icons.play}
                className="h-12 w-12 absolute"
                resizeMode="contain"/>
                </TouchableOpacity>
            }
      
    </View>
  )
}

export default VideoCard