import { View, Text, FlatList, TouchableOpacity, Image, RefreshControl, Alert, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
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
import NavbarCom from '../../components/NavbarCom';
import { router, usePathname} from 'expo-router'
import { Route } from 'expo-router/build/Route';


const width = Dimensions.get('window').width


const Home = () => {

  const brands = ["All", "Nike", "Adidas", "Reebok", "Puma", "Under Armour", "Converse", "Vans", "New Balance", "Asics", "Skechers"];

  const {data: sneakers, refetch, isLoading} = useAppWrite(getSneakers);

  const {isLoggedIn, user, getUser} = useGlobalContext()
  const [refreshing, setRefreshing] = useState(false)

  const {itemStyle, columnWrapper} = styles

  const [selectedBrand, setSelectedBrand] = useState("All")

  const flatListRef = useRef(null);

  const pathname = usePathname()


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

  console.log(selectedBrand)
  

  const SneakerBrand = ({item}) =>{
    const isActive = item === selectedBrand;

    return (
      <TouchableOpacity
        onPress={() => setSelectedBrand(item)}
      >
        <View className={`px-4 py-4 mt-4 mb-2 rounded-xl mr-3 ${isActive ? "bg-black" : 'bg-gray-200'}`}>
          <Text className={`font-pregular text-[14px] ${isActive ? "text-white font-psemibold" : "text-gray-700"}`}>{item}</Text>
        </View>
      </TouchableOpacity>
    )

  }

  const onSneakerPress = (item) => {
    // Use router.push to navigate and pass parameters
    router.push({
      pathname: '/sneakerDetail/[SneakerDetail]',
      params: { id: 2, sneakers: JSON.stringify(item)}, // Convert the item to a string to pass as a param
    });
  };

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
                    sneakerPress={() => onSneakerPress(item)}
                />
            </View>
        )}

        ListHeaderComponent={() => (
          <View className='mb-4'>

              <NavbarCom
                leftIcon={icons.settings}
                title={"Sneakerz"}
              />

              <SearchInput
                extraStyles={"mx-0"}
                inputStyles={" bg-gray-200 h-[50px] border-1 border-gray-200 rounded-2xl"}
                placeholder={"Search"}
                value={""}
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

              <FlatList
                data={brands}
                keyExtractor={(item) => item.$id}
                horizontal
                renderItem={({item}) => (
                  <SneakerBrand 
                    item={item}
                  />
                )}

              /> 

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