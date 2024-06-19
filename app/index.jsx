import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image, ActivityIndicator } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import floating_shoes from '../assets/floating-shoes.gif'
import CustomButton from '../components/CustomButton';
import { checkSession } from '../lib/appwrite';
import { useEffect, useState } from 'react';
import { useGlobalContext} from '../context/GlobalProvider';

export default function App() {

  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home"/>;

  return (
    <SafeAreaView className = ' h-full bg-white'>
      <ScrollView contentContainerStyle={{ height: '100%'}}>

          <View className = ' w-full items-center justify-center h-[fit] px-2 '>
            <Image
              source={floating_shoes}
              className = 'max-w-[380px] w-full'
              resizeMode='contain'
            />
          </View>

          <View className = 'mt-5 mb-8'>
            <Text className = ' text-black text-center font-pbold  text-[24px] px-4 uppercase '>Change Your <Text className='text-[#40A578]'>Sneakers</Text> Game With Us</Text>
            <Text className = ' text-gray-400 text-center font-pregular  text-[14px] px-6 mt-2  '>Looking for a perfect pairs of shoes? Get started now with our trending shoes to step up your style game.</Text>
          </View>

          <CustomButton 
            title='Explore Now'
            handlePress={() => {
              if(isLoggedIn){
                router.push('/home')
              }
                router.push('/sign-in')
            }}
          
          >

          </CustomButton>

      </ScrollView>

      <StatusBar backgroundColor='' style='dark'/>
    </SafeAreaView>
  );
}


