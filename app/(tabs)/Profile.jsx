import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import icons from '../../constants/icons'
import { logout } from '../../lib/appwrite'
import { router } from 'expo-router'

const Profile = () => {

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Logout Success', 'You have been logged out.');
      router.replace('sign-in'); // Redirect to sign-in screen
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <View>
        <TouchableOpacity onPress={handleLogout}>
          <Image 
            source={icons.logout}
            tintColor={'#40A578'}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})