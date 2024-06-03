import { View, Text, FlatList, TouchableOpacity, Image, RefreshControl, Alert, Dimensions, StyleSheet } from 'react-native'

import React, { useEffect, useState } from 'react'

import {useLocalSearchParams} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import useAppWrite from '../../lib/useAppWrite';
import icons from '../../constants/icons'
import { searchSneakers } from '../../lib/appwrite';
import SneakersCard from '../../components/SneakersCard';

const Search = () => {
  const { query } = useLocalSearchParams();

  const { data: sneakers, refetch, isLoading} = useAppWrite(
    () => searchSneakers(query)
  )

  const {itemStyle, columnWrapper} = styles

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  const Navbar = () => {
    return(
      <View className=' w-[100%] pt-4 flex-row items-center justify-between mb-4'>
      <Image
        source={icons.settings}
        className=' w-8 h-8 ml-1'
        resizeMode='contain'
      />

      <Text className='text-2xl font-psemibold pt-1 text-[#40A578]'>Sneakerz</Text>

      <Image
        source={icons.shopcart}
        className=' w-8 h-8 mr-1'
        resizeMode='contain'
      />

    </View>
    )
  }

  return (
    <SafeAreaView className=''>
      <FlatList 
      className='px-4'
        data={sneakers}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
            <View style={itemStyle}>
                <SneakersCard 
                    posts={item}
                />
            </View>
        )}

        ListHeaderComponent={() => (
          <View className='mb-4'>

              <Navbar />

              <Text>Searched : {query}</Text>

          </View>
          )}
         refreshControl={<RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
          />} 
      />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  columnWrapper: {
    columnGap: 12
  },
  itemStyle : {
    flex: 1,
    margin: 1,
    height: '100%',
  }
})

export default Search