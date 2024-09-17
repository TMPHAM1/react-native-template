import { Text, View, Image} from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton'
import { images } from '../constants'
import { router } from 'expo-router'

const EmptyState = ({title, subtitle}) => {
    return (
      <View className="justify-center items-center px-4">
        <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode='contain'
        />
            <Text className="font-psemibold text-2xl text-gray-100">{title}</Text>
              <Text className=" font-pmedium mb-2 text-sm text-white">{subtitle}</Text>
              <CustomButton
                title="Create Video"
                containerStyles="w-full my-5"
                handlePress={() => router.push('/create')}
              />
      </View>
    )
}

export default EmptyState