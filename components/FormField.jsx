import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import icons from '../constants/icons'

const FormField = ({title, value, placeholder, handleOnType, extraStyles, onFocus, ...props}) => {

  const [showPass, setShowPass] = useState(false)

  return (
    <View className={` space-y-2 ${extraStyles} mx-6`}>
      <Text className=' text-[14px] text-gray-700 font-pmedium mb-[-2px] ml-1'>{title}</Text>
      
      <View className=' w-full h-[56px] border-2 border-gray-400 rounded-xl mb-2 focus:border-[#40A578] flex-row items-center'>
        <TextInput 
          className=" flex-1 text-gray-600 font-psemibold text-[14px] mx-2"
          value={value}
          placeholder={title}
          onChangeText={handleOnType}
          onFocus={onFocus}
          secureTextEntry={title === 'Password' && !showPass}

        />


          {title === 'Password' && 
          <TouchableOpacity
            onPress={() => {
              setShowPass(!showPass)
            }}>
              <Image 
                source={ !showPass ? icons.eye : icons.eyeHide}
                className=' w-[26px] h-[26px] mr-3'
                resizeMode='contain'
              
              ></Image>

          </TouchableOpacity> }

      </View>
    </View>
  )
}

export default FormField