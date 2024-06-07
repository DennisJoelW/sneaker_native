import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import icons from '../../constants/icons'
import CustomButton from '../../components/CustomButton'
import NavbarCom from "../../components/NavbarCom"

const upload = () => {

  const [uploading, setUploading] = useState(false)
  const [form, setform] = useState({
    sneakersName : '',
    sneakersPrice : '',
    sneakersImage : '',
    brand : ''
  })

  return (
    <SafeAreaView>
      <ScrollView className='px-4 mb-6'>

        <NavbarCom 
          leftIcon={icons.back}
          title={"Input Sneakers"}
          leftIconStyle={" ml-0 w-7 h-7"}
          rightIconStyle={'w-0 h-0'}
        />

        <FormField 
          extraStyles={' mx-0 space-y-0'}
          inputStyles={' h-[50px] bg-gray-200'}
          value={form.sneakersName}
          placeholder={" Sneakers Name"}
          handleOnType={(e) => setform({...form, sneakersName : e})}
        />

        <FormField 
          extraStyles={' mx-0 space-y-0'}
          inputStyles={' h-[50px] bg-gray-200'}
          value={form.sneakersPrice}
          placeholder={" Sneakers Price"}
          handleOnType={(e) => setform({...form, sneakersPrice : e})}

        />

        <TouchableOpacity
          activeOpacity={0.8}
        >
          <View className=' bg-gray-200 h-[170px] w-full my-2 rounded-xl border-gray-400 border-2 items-center justify-center'>
            <Image
              source={icons.upload}
              tintColor={"#6b7280"}
              style={{width:55, height:55 }}
            /> 
            <Text className=' font-pmedium text-[12px] text-gray-400 mt-2'>Upload Image</Text>
          </View>
        </TouchableOpacity>

        <FormField 
          extraStyles={' mx-0 space-y-0'}
          inputStyles={' h-[50px] bg-gray-200'}
          value={form.sneakersImage}
          placeholder={" Sneakers Image URL"}
          handleOnType={(e) => setform({...form, sneakersImage : e})}

        />

        <FormField 
          extraStyles={' mx-0 space-y-0'}
          inputStyles={' h-[50px] bg-gray-200'}
          value={form.brand}
          placeholder={" Sneakers Brand"}
          handleOnType={(e) => setform({...form, brand : e})}
        />

        <CustomButton
          title={"Submit Sneakers"}
          containerStyles={' mx-0 mt-4'}
        />


      </ScrollView>
    </SafeAreaView>
  )
}

export default upload