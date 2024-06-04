import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import icons from '../constants/icons'


const NavbarCom = ({leftIcon, rightIcon}) => {
    return(
      <View className=' w-[100%] pt-4 flex-row items-center justify-between mb-4'>

        <TouchableOpacity>
            <Image
            source={leftIcon}
            className=' w-8 h-8 ml-1'
            tintColor={"black"}
            resizeMode='contain'
            />
        </TouchableOpacity>


      <Text className='text-2xl font-psemibold pt-1 text-[#40A578]'>Sneakerz</Text>

      <TouchableOpacity>

        <Image
            source={icons.shopcart}
            className=' w-8 h-8 mr-1'
            resizeMode='contain'
        />

    </TouchableOpacity>
      

    </View>
    )
  }

export default NavbarCom