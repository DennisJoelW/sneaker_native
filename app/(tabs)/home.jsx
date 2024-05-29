import { View, Text } from 'react-native'
import React from 'react'
import GlobalProvider, { useGlobalContext } from '../../context/GlobalProvider';
import { Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {

  const {isLoggedIn, user, getUser} = useGlobalContext()

  if(!isLoggedIn){
    return(
      <Redirect href="/sign-in" />
    )
  }

  return (
    <SafeAreaView>
      <Text>{user}</Text>
    </SafeAreaView>
  )
}

export default Home