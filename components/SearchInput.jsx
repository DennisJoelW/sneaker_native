import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import icons from '../constants/icons'

const SearchInput = ({title, value, placeholder, handleOnType, extraStyles, inputStyles, onFocus, ...props}) => {

  const [showPass, setShowPass] = useState(false)

  return (
    <View className={` space-y-2  mx-6 ${extraStyles}`}>
      
      <View className={` w-full h-[56px] border-2 border-gray-400 rounded-xl mb-2 focus:border-[#40A578] flex-row items-center ${inputStyles} `}>
        <TextInput 
          className=" flex-1 text-gray-600 font-psemibold text-[14px] mx-2"
          value={value}
          placeholder={placeholder}
          onChangeText={handleOnType}
          onFocus={onFocus}
          secureTextEntry={title === 'Password' && !showPass}

        />
        <TouchableOpacity>
            <Image 
                source={icons.search}
                tintColor={"#A0A0A0"}
                className='w-5 h-5 mr-2'
                resizeMethod='contain'
            />
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default SearchInput