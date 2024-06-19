import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import icons from '../../constants/icons'
import { getCurrentUser, logout, signOut } from '../../lib/appwrite'
import { router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import useAppWrite from '../../lib/useAppWrite'
import NavbarCom from '../../components/NavbarCom'
import CustomButton from '../../components/CustomButton'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const Profile =  () => {

  const { user, setUser, setIsLoggedIn} =  useGlobalContext()

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Logout Success', 'You have been logged out.');
      router.replace('sign-in'); // Redirect to sign-in screen
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  const logout = async () => {
    await signOut();

    Alert.alert('Logout Success', 'You have been logged out.');
    router.replace('sign-in');
  }

  const ProfileItems = ({ itemText, itemIcon }) => {
    return (
    <TouchableOpacity>
        <View className=' flex-row w-full justify-between px-2 py-5 border-gray-300 border-t-2 mb-1'>

        <View className='flex-row items-center'>
          <Image
            source={itemIcon}
            className=' w-4 h-4'
          />
          <Text className=' font-pregular ml-8'>{itemText}</Text>
        </View>

        <Image
          source={icons.next}
        />
      </View>
    </TouchableOpacity>
    )
  }


  return (
    <SafeAreaView className='px-4'>
      <View className=' w-full items-center'>
        <NavbarCom
          rightIcon={icons.logout}
          leftIcon={icons.admin}
          leftIconPress={() => router.push("/create/upload")}
          title={"My Account"}
          titleStyle={'text-black text-[18px] font-psemibold'}
          rightIconStyle={'w-6 h-6'}
          rightIconPress={logout}
        />
        <Image
          source={user ? {uri: user.avatar} : ""}
          className='w-20 h-20'
          borderRadius={100}
        />

        <Text className=' text-[14px] font-psemibold mt-2 mb-8 '>@{user.username}</Text>

        <ProfileItems 
          itemText={"Basic Information"}
          itemIcon={icons.information}
        />
        <ProfileItems 
          itemText={"Privacy & Security"}
          itemIcon={icons.privacy}
        />
        <ProfileItems 
          itemText={"Shopping Cart"}
          itemIcon={icons.shopcart}
        />


      </View>

    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})