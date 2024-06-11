import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import icons from '../../constants/icons'
import CustomButton from '../../components/CustomButton'
import NavbarCom from "../../components/NavbarCom"
import * as DocumentPicker from 'expo-document-picker'
import {router} from 'expo-router'
import { uploadSneaker } from '../../lib/appwrite'
import * as ImagePicker from 'expo-image-picker';


const upload = () => {
  const [uploading, setUploading] = useState(false)
  const [form, setform] = useState({
    sneakersName : '',
    sneakersPrice : '',
    sneakersImage : '',
    imageThumbnail: null,
    brand : ''
  })

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
        const asset = result.assets[0];

        setform({ ...form, imageThumbnail: asset });
    } else {
        console.log("Image picking was canceled or no assets found.");
    }
};



  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync
    ({
      type: selectType === 'image' ? ['image/*', 'image/jpg'] : ['video/mp4', 'video/gif']
    }) 

    if(!result.canceled){
      if(selectType === 'image'){
        setform({...form, imageThumbnail: result.assets[0]})
      }

      if(selectType === 'video'){
        setform({...form, video: result.assets[0]})
      }
    } else {
      setTimeout(() => {
        Alert.alert('Document Picked', JSON.stringify(result, null, 2))
      }, 100)
    }
  }

  const submit = async () => {
    if(!form.sneakersName || !form.sneakersPrice || !form.sneakersImage || !form.imageThumbnail || !form.brand){
      return Alert.alert('Please fill in all the fields')
    } else {
      setUploading(true)
      try {
        await uploadSneaker({ ...form})


        Alert.alert('Upload Success')
        router.push('/home')
      } catch (error) {
        Alert.alert('Error', error.message)
      } 
    }
  }

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
          activeOpacity={0.6}
          onPress={() => openPicker('image')}
        >
          <View className=' bg-gray-200 h-[170px] w-full my-2 rounded-xl border-gray-400 border-2 items-center justify-center'>
            {form.imageThumbnail ? (
              <Image
                source={{uri: form.imageThumbnail.uri}}
                resizeMode='cover'
                className=' w-full h-full rounded-xl'
              />
            ) : (
              <>
                <Image
                  source={icons.upload}
                  tintColor={"#6b7280"}
                  style={{width:55, height:55 }}
                /> 
                <Text className=' font-pmedium text-[12px] text-gray-400 mt-2'>Upload Image</Text>
              </>
            )}
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
          handlePress={submit}
          isLoading={uploading}
        />


      </ScrollView>
    </SafeAreaView>
  )
}

export default upload