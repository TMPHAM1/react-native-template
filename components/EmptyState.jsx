import { Text, View, Image} from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton'
import { images } from '../constants'
import { router, usePathname } from 'expo-router'

const EmptyState = ({title, subtitle}) => {
  const pathname = usePathname();
    return (
      <View className="justify-center items-center px-4">
       {pathname !== '/bookmarks' ? <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode='contain'
        /> : null}
            <Text className="font-psemibold text-2xl text-gray-100">{title}</Text>
              <Text className=" font-pmedium mb-2 text-sm text-white">{subtitle}</Text>
              <CustomButton
                title={pathname !== '/bookmarks' ? "Create Video" : "Discover Videos"}
                containerStyles="w-full my-5"
                handlePress={() => router.push(pathname !== '/bookmarks' ? '/create' : '/home')}
              />
      </View>
    )
}

export default EmptyState