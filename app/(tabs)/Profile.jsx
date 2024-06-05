import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import icons from '../../constants/icons'
import { getCurrentUser, logout, signOut } from '../../lib/appwrite'
import { router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import useAppWrite from '../../lib/useAppWrite'
import NavbarCom from '../../components/NavbarCom'

const Profile = () => {

  const { user, setUser, setIsLoggedIn} = useGlobalContext()

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


  return (
    <SafeAreaView className='px-4'>
      <View className=' w-full items-center'>
        <NavbarCom
          rightIcon={icons.logout}
          title={"My Account"}
          titleStyle={'text-black text-[16px] font-psemibold'}
          rightIconStyle={'w-6 h-6'}
          rightIconPress={logout}
        />
        <Image
          source={{uri: user.avatar}}
          className='w-20 h-20'
          borderRadius={100}
        />

      </View>
      {/* <View>
        <TouchableOpacity onPress={handleLogout}>
          <Image 
            source={icons.logout}
            tintColor={'#40A578'}
          />
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})