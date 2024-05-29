import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import GlobalProvider, { useGlobalContext } from '../../context/GlobalProvider';
import { Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '../../constants/icons'
import FormField from '../../components/FormField'
import SearchInput from '../../components/SearchInput';
import Carousel from '../../components/Carousel';


const Home = () => {

  const {isLoggedIn, user, getUser} = useGlobalContext()

  if(!isLoggedIn){
    return(
      <Redirect href="/sign-in" />
    )
  }

  return (
    <SafeAreaView>
      <View className=' w-[100%] px-4 pt-4 flex-row items-center justify-between mb-4'>
        <Image
          source={icons.settings}
          className=' w-8 h-8 ml-1'
          resizeMode='contain'
        />

        <Text className='text-2xl font-pmedium pt-1'>Sneakerz</Text>

        <Image
          source={icons.shopcart}
          className=' w-8 h-8 mr-1'
          resizeMode='contain'
        />
      </View>

      <SearchInput
        extraStyles={"mx-4"}
        inputStyles={" bg-gray-200 h-[50px] border-1 border-gray-300 rounded-2xl"}
        placeholder={"Search"}
      />

      <Carousel
        posts={[{ id:1 , brand: "Nike"}, {id:2 , brand: "Adidas"}] ?? []}
      />

      {/* <FlatList 
        data={[{ id:1 , brand: "Nike"}, {id:2 , brand: "Adidas"}]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text className = 'text-3xl font-pregular'>{item.id}.{item.brand}</Text>
        )}
        ListHeaderComponent={() => {
          <View>

          </View>
        }}
      /> */}

    </SafeAreaView>
  )
}

export default Home