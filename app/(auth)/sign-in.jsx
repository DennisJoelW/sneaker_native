import { View, Text, SafeAreaView, ScrollView, Image} from 'react-native'
import React, { useState } from 'react'
import shoes_login from '../../assets/shoes-login.png'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'


const SignIn = () => {

  const [form, setform] = useState({
    email:'',
    password:''
  })

  const [isUserTyping, setIsUserTyping] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () => {

  }

  return (
    <SafeAreaView className = ' h-full bg-white'>
      <ScrollView contentContainerStyle={{height:'100%'}}>
        <View className=' w-full h-fit items-end pl-2'>
            <Image
              source={shoes_login}
              className = {`max-w-[320px] w-full ${isUserTyping ? 'h-[150px]' : 'h-[230px]'}`}
              resizeMode='contain'
            />
        </View>
        <View className=''>
            <Text className=' text-[26px] font-pbold text-black text-center '>Welcome Back !</Text>
            <Text className=' text-[17px] font-pregular text-gray-400 mt-[-5px] text-center mb-4'>Enter Your Email And Password</Text>

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
              title={"Login"}
              isLoading={isSubmitting}
            />

            <Text className=' text-center mt-3 text-gray-800 text-[15px] font-pregular'>Dont have an account ? <Text className=' font-psemibold'>Sign up</Text></Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn