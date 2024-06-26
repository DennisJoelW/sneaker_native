import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import icons from '../constants/icons'


const NavbarCom = ({leftIcon, rightIcon, title, titleStyle, leftIconPress, rightIconPress, rightIconStyle, leftIconStyle, itemCount}) => {
    return(
      <View className=' w-[100%] pt-4 flex-row items-center justify-between mb-4'>

        <TouchableOpacity
         onPress={leftIconPress}
        >
            <Image
              source={leftIcon}
              className={` w-8 h-8 ml-1 ${leftIconStyle}`}
              tintColor={"black"}
              resizeMode='contain'
            />
        </TouchableOpacity>


      <Text className={`text-2xl font-psemibold pt-1 text-[#40A578] ${titleStyle} `}>{title}</Text>

      <TouchableOpacity
        onPress={rightIconPress}
      >

        <Image
            source={rightIcon ? rightIcon : icons.shopcart}
            className={` w-8 h-8 mr-1 ${rightIconStyle}`}
            resizeMode='contain'
            tintColor={'black'}
        />

        {!rightIcon && itemCount ? (
                  <View className='w-[18px] h-[18px] rounded-full bg-red-600 items-center justify-center absolute top-[-5px] left-[-8px]'>
                  <Text className=' text-white text-[10px] font-psemibold'>{itemCount}</Text>
                </View>
        ) : ""}



    </TouchableOpacity>
      

    </View>
    )
  }

export default NavbarCom