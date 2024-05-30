import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton'

const Carousel = ({posts}) => {
  return (
    <FlatList
        data={posts}
        className='px-4'
        showsVerticalScrollIndicator='true'
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (

          <View className=' flex-row'>
            <View className=' w-[100%] h-fit bg-gray-300 mt-2 rounded-xl px-4 py-6'>
                <Text className=' font-pmedium text-lg'>30% Discount</Text>
                <Text className=' font-pmedium text-lg'>Off Shoes</Text>

                <CustomButton
                  title={"Explore Now"}
                  containerStyles={"mx-0 w-[120px] align-end mt-8 h-[50px]"}
                  textStyles={" text-[14px]"}
                />
            </View>
            
            <Image
              source={{ uri: item.sneakersImage}}
              style={{ width: 200, height:200}}
              resizeMode='contain'
            />
          </View>  
        )}
        horizontal
    />

  )
}

export default Carousel