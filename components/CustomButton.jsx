import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
        className={` bg-black rounded-lg w-fit h-[55px] mx-4 flex justify-center 
        ${containerStyles} 
        ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}
        activeOpacity={0.75}
        onPress={handlePress}
    >
      <Text className = ' text-white text-center justify-center font-psemibold text-lg'>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton