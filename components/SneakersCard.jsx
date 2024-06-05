import { View, Text, FlatList, Image, Number, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'

import icons from '../constants/icons'

const SneakersCard = ({ posts }) => {
    
  function formatNumberWithCommas(number) {
    // Check if the input is a valid number
    if (isNaN(number)) {
      return "Invalid number";
    }
  
    // Convert the number to a string
    const numberString = number.toString();
  
    // Split the number into integer and decimal parts
    const [integerPart, decimalPart = ""] = numberString.split(".");
  
    // Reverse the integer part for easier comma insertion
    const reversedInteger = integerPart.split("").reverse().join("");
  
    // Insert commas every 3 digits
    const formattedInteger = reversedInteger.replace(/(\d{3})(?!$)/g, "$1,");
  
    // Reverse the formatted integer back to normal order
    const finalInteger = formattedInteger.split("").reverse().join("");
  
    // Combine the formatted integer and decimal part
    return `${finalInteger}${decimalPart.length > 0 ? "." + decimalPart : ""}`;
  }

  return (
            <TouchableOpacity
                activeOpacity={0.7}
            >
                <View className='h-fit bg-gray-200 rounded-2xl items-center px-3 pb-6 mb-4 border-2 border-gray-300'>
                    <Image
                        source={{uri:posts.sneakersImage}}
                        className='mt-[-35px]'
                        style={{ width:150, height:150}}
                        resizeMode='contain'
                    />

                    <Text className=' font-psemibold text-[13px] w-full mb-5 mt-1' numberOfLines={2} ellipsizeMode='tail'>{posts.sneakersName}</Text>
                    
                    <View className='flex-row justify-between flex w-full items-center'>
                        <Text className='font-psemibold text-[12px] text-[#40A578]' 
                            >IDR {formatNumberWithCommas(posts.sneakersPrice)}</Text>
                        
                        <TouchableOpacity
                            activeOpacity={0.6}
                        >
                            <Image
                                source={icons.add}
                                style={{width:25, height:25}}
                                resizeMode='contain'
                                tintColor={"#40A578"}
                            />
                        </TouchableOpacity>

                    </View>
                </View>
            </TouchableOpacity>
        )
}

export default SneakersCard