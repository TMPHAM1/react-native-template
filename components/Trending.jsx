import { View, Text, FlatList } from 'react-native'
import React from 'react'

const Trending = ({posts}) => {
  if (!posts || posts.length === 0) {
    return null
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
        <Text className="text-3xl text-white" >{item.id}</Text>
)}
    horizontal
/>
    </View>

  )
}

export default Trending