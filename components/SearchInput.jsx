import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import icons from '../constants/icons'
import { router, usePathname } from 'expo-router'

const SearchInput = ({title, value, placeholder, handleOnType, extraStyles, inputStyles, onFocus, ...props}) => {

  const [showPass, setShowPass] = useState(false)

  const pathname = usePathname()

  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (!query) return null;

    if (pathname.startsWith('/search')) {
      router.setParams({query});
    } else {
      router.push(`/search/${query}`);
    }
  };

  return (
    <View className={` space-y-2  mx-6 ${extraStyles}`}>
      
      <View className={` w-full h-[56px] border-2 border-gray-400 rounded-xl mb-2 focus:border-[#40A578] flex-row items-center ${inputStyles} `}>
        <TextInput 
          className=" flex-1 text-gray-600 font-psemibold text-[14px] mx-2"
          value={query}
          placeholder={placeholder}
          onChangeText={(e) => setQuery(e)}
          onFocus={onFocus}
          secureTextEntry={title === 'Password' && !showPass}
          onSubmitEditing={handleSearch}

        />
        <TouchableOpacity
          onPress={handleSearch}
        >
            <Image 
                source={icons.search}
                tintColor={"#40A578"}
                className='w-[19px] h-[19px] mr-3'
                resizeMethod='contain'
            />

        </TouchableOpacity>

      </View>
    </View>
  )
}

export default SearchInput