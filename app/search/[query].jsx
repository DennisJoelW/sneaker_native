import { View, Text, FlatList, TouchableOpacity, Image, RefreshControl, Alert, Dimensions, StyleSheet } from 'react-native'

import React, { useEffect, useState } from 'react'

import {useLocalSearchParams} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import useAppWrite from '../../lib/useAppWrite';
import icons from '../../constants/icons'
import { searchSneakers } from '../../lib/appwrite';
import SneakersCard from '../../components/SneakersCard';
import NavbarCom from '../../components/NavbarCom';

const Search =  () => {
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

  useEffect(() => {
    refetch()
  }, [query])

  if(isLoading){
    return (
      <SafeAreaView className='px-4 mb-4'>
  
      <NavbarCom
        leftIcon = {icons.back}
      />

      <Text className='font-pregular text-sm ml-1'>Searched : <Text className=' font-psemibold'>{query}</Text></Text>

      </SafeAreaView>
    )
  }

  if(!isLoading){
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
  
                <NavbarCom
                  leftIcon = {icons.back}
                />
  
                <Text className='font-pregular text-sm ml-1'>Searched : <Text className=' font-psemibold'>{query}</Text></Text>
  
            </View>
            )}

            refreshControl={<RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
              />} 
    
            ListEmptyComponent={() => (
              <View className=' w-full items-center h-[40vh] justify-center'>
                  <Image
                    source={icons.notFound}
                    style={{width: 150, height:150}}
                    resizeMode='contain'
                  />
                  <Text className=' font-psemibold mt-4'>SNEAKERS NOT FOUND</Text>
                  <Text className=' font-pregular'>No sneakers found for this search</Text>
  
              </View>
            )}
  
        />
  
      </SafeAreaView>
    )
  }

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