import { View, Text, FlatList, TouchableOpacity, Image, RefreshControl, Alert, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalProvider, { useGlobalContext } from '../../context/GlobalProvider';
import { Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '../../constants/icons'
import FormField from '../../components/FormField'
import SearchInput from '../../components/SearchInput';
import Carousel from '../../components/Carousel';
import { getSneakers } from '../../lib/appwrite';
import useAppWrite from '../../lib/useAppWrite';
import CustomButton from '../../components/CustomButton';
import jordan from '../../assets/jordan.png'
import SneakersCard from '../../components/SneakersCard';

const width = Dimensions.get('window').width



const Home = () => {

  const {data: sneakers, refetch, isLoading} = useAppWrite(getSneakers);

  const {isLoggedIn, user, getUser} = useGlobalContext()
  const [refreshing, setRefreshing] = useState(false)

  const {itemStyle, columnWrapper} = styles


  if(!isLoggedIn){
    return(
      <Redirect href="/sign-in" />
    )
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  console.log(sneakers)

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

              <SearchInput
                extraStyles={"mx-0"}
                inputStyles={" bg-gray-200 h-[50px] border-1 border-gray-200 rounded-2xl"}
                placeholder={"Search"}
              />

              <View className='mt-3'>

                <View className=' w-[100%] h-fit bg-gray-300 rounded-xl px-4 flex-row items-center justify-center'>

                  <View className='w-1/2'>
                    <Text className=' font-psemibold text-[16px]'>20% Discount Off</Text>
                      <Text className=' font-psemibold text-[16px]'>All Shoes</Text>

                      <CustomButton
                        title={"Explore Now"}
                        containerStyles={"mx-0 w-[120px] align-end mt-8 h-[50px] bg-[#40A578]"}
                        textStyles={" text-[14px]"}
                      />
                  </View>

                  <View className='w-1/2 justify-start items-start relative'>
                    <Image
                        source={jordan}
                        className='top-[-25px] left-[-50px] fixed'
                        style={{width:195, height:195,    
                        transform: [
                          { rotate: '-35deg' }, // Tilt
                          { scaleX: -1 },       // Mirror
                        ]}}
                        resizeMode='contain'
                    />
                  </View>

                </View>

              </View>  

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

export default Home