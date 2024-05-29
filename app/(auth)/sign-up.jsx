import { View, Text, SafeAreaView, ScrollView, Image, Alert} from 'react-native'
import React, { useState } from 'react'
import shoes_login from '../../assets/shoes-singup.png'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'

import { createUser } from '../../lib/appwrite.js'
import { useGlobalContext } from '../../context/GlobalProvider.js'

const SignUp = () => {

  const [form, setform] = useState({
    username:'',
    email:'',
    password:''
  }) // 1:43:47

  const [isUserTyping, setIsUserTyping] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const {setUser, setIsLoggedIn} = useGlobalContext()

  const submit = async () => {
    if(!form.username || !form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true)

    try {
      const result = await createUser(form.email, form.password, form.username)
      setUser(result)
      setIsLoggedIn(true)

      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally{
      setIsSubmitting(false)
    }
    createUser();
  }

  return (
    <SafeAreaView className = ' h-full bg-white'>
      <ScrollView contentContainerStyle={{height:'100%'}}>
        <View className=' w-full h-fit items-center pl-2'>
            <Image
              source={shoes_login}
              className = {`max-w-[310px] w-full ${isUserTyping ? 'h-[100px] mb-2' : 'h-[200px]'}`}
              resizeMode='contain'
            />
        </View>
        <View className=''>
            <Text className=' text-[26px] font-pbold text-black text-center '>Sign Up</Text>
            <Text className=' text-[17px] font-pregular text-gray-400 text-center mb-4'>Fill Username, Email, and Password</Text>

            <FormField
              title="Username"
              value={form.username}
              handleOnType={(e) => {
                setform({ ...form, username:e})
              }}
              onFocus={() => setIsUserTyping(true)}
              onBlur={() => setIsUserTyping(false)}
            />

            <FormField
              title="Email"
              value={form.email}
              handleOnType={(e) => {
                setform({ ...form, email:e})
              }}
              onFocus={() => setIsUserTyping(true)}
              onBlur={() => setIsUserTyping(false)}
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              value={form.password}
              onFocus={() => setIsUserTyping(true)}
              onBlur={() => setIsUserTyping(false)}
              handleOnType={(e) => {
                setform({ ...form, password:e})
              }}
            />

            <CustomButton 
              containerStyles={" mx-6 mt-8 h-[58px] bg-black"}
              handlePress={submit}
              title={"Sign up"}
              isLoading={isSubmitting}
            />

            <Text className=' text-center mt-3 text-gray-800 text-[15px] font-pregular'>Already have an account ? <Link href={"/sign-in"} className=' font-psemibold'>Login</Link></Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp