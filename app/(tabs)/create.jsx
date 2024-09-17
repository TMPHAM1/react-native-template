import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'

import {ResizeMode, Video,  } from 'expo-av'
import * as ImagePicker from 'expo-image-picker'

import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../../constants';
import { createVideo } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Image : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
        if (selectType === 'image') {
          setForm({...form, thumbnail: result.assets[0]})
        }
        if (selectType === 'video') {
          setForm({...form, video: result.assets[0]})
        }
    }

    else {
      setTimeout(() => Alert.alert('Document picked', JSON.stringify(result, null, 2)))
    }
  }

  const submit = async () => {
    if(!form.prompt || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert("Please fill in all the fields")
    }

    setUploading(true);

    try {
      await createVideo({...form, userId: user.$id});

        Alert.alert('Success', 'Post Uploaded Successfully')
        router.push('/home')
    }catch(error) {
      Alert.alert('Error', error.message) }
    finally {
     setForm({ title: '',
      video: null,
      thumbail: null,
      prompt: '',
    })
  }

  }


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Upload Video
        </Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give the video a title"
          handleChangeText={(e) => setForm({...form, title: e})}
          otherStyles="mt-10"
          />
          <View className="mt-7 space-y-2">
            <Text className="text-base text-gray-100 font-pmedium">Upload Video</Text>
          </View>
          <TouchableOpacity onPress={()=> openPicker('image')}>
            {form.video ? (<Video 
              source={{uri: form.video.uri}}
              className="w-full h-64 rounded-2xl"
              useNativeControls
              resizeMode={ResizeMode.COVER}
              isLooping
            
            />) : (
              <View className="w-full h-40 px-4 bg-gray-700 rounded-2xl justify-center items-center">
                <View className="w-14 h-15 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity >
          <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Thumbnail Image</Text>
          <TouchableOpacity onPress={()=> openPicker('image')}> 
            {form.thumbnail ? (<image 
              source={{uri: form.thumbnail.uri}}
              className="w-full h-64 rounded-2xl"
              resizeMode="cover"
            
            />) : (
              <View className="w-full h-40 px-4 bg-gray-700 rounded-2xl justify-center items-center
              border-2 border-black-200 flex-row space-x-2">
                
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-5 h-5"
                  />
                <Text className="text-sm text-gray-100 font-pmedium">Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
          </View>
          <FormField
          title="AI Prompt"
          value={form.title}
          placeholder="Enter Prompt used to create this video"
          handleChangeText={(e) => setForm({...form, prompt: e})}
          otherStyles="mt-10"
          />
      </ScrollView>
      <CustomButton
        title="Submit & Publish"
        containerStyles="mt-7"
        handlePress={submit}
        isLoading={uploading}
      />
    </SafeAreaView>
  )
}

export default Create