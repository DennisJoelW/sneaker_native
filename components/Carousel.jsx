import { View, Text, FlatList } from 'react-native'
import React from 'react'

const Carousel = ({posts}) => {
  return (
    <FlatList
        data={posts}
        className='px-4'
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
            <View className=''>
                <Text>{item.id}</Text>
            </View>
        )}
        horizontal
    />

  )
}

export default Carousel