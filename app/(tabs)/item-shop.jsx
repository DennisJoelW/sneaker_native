import { View, Text, Image, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavbarCom from '../../components/NavbarCom'
import icons from '../../constants/icons'
import jordan from '../../assets/jordan.png'
import { getSneakers, getSneakersCart } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const ItemShop = () => {

  const [sneakers, setSneakers] = useState([]);

  const { user, setUser, setIsLoggedIn} =  useGlobalContext()

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetchSneakers();
  }, []);

  const fetchSneakers = async () => {
    setIsLoading(true);
    try {
      const data = await getSneakersCart(user.accountId);
      setSneakers(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch sneakers");
    } finally {
      setIsLoading(false);
    }
  };

  console.log(sneakers)


  const Item = ({ image, name, price, brand}) => {
    return (
      <View className=' flex-row w-full mb-2 mt-2 '>
      <Image
        source={{uri: image}}
        resizeMode='contain'
        className=' w-[38%] h-[125px] bg-gray-200 rounded-xl'
      />

      <View className=' py-3 px-3 justify-between w-[64%]'>

        <View>

          <View className='flex-row justify-between'>
            <Text className=' font-psemibold text-[13px] max-w-[60%]'>{name}</Text>
            <Image
              source={icons.remove}
              className=' w-[20px] h-[20px] '
              tintColor={"red"}
            />
          </View>

          <Text className= ' font-pregular text-gray-400'>{brand}</Text>
          
        </View>

        <View className =' flex-row justify-between'>
          <Text className ='font-pregular text-[13px]'>- 1 +</Text>
          <Text className=' font-pregular text-[13px]'>{price}</Text>
        </View>

      </View>


    </View>
    )
  }

  return (
    <SafeAreaView className ='px-4'>

        <FlatList
          data={sneakers}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <View>
                <Item 
                  name={item.sneakersName}
                  image={item.sneakersImage}
                  brand={item.brand}
                  price={item.sneakersPrice}
                />
            </View>
          )}
          ListHeaderComponent={() => (

            <View>

                <NavbarCom 
                    leftIcon={icons.back}
                    leftIconStyle={' w-[26px] h-[26px]'}
                    rightIconStyle={' w-[24px] h-[24px] '}
                    rightIcon={icons.profile}
                    title={"My Cart"}
                    titleStyle={' text-[18px] text-black'}
                />


            </View>

          )}
        />





    </SafeAreaView>
  )
}

export default ItemShop