import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router';
import { icons } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider';

const TabIcon = ({ icon, color, name, focused, imgSize}) => {
  return (
    <View className=" flex items-center justify-center gap-2">
      <Image
        source={icon}
        tintColor={color}
        resizeMode='contain'
        className = {` ${imgSize} items-center`}
      />
      <Text className={`${focused ? 'font-psemibold text-[#40A578]' : 'font-pregular'} text-xs`}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {



  return (
    <>
      <Tabs screenOptions={{ 
        tabBarShowLabel:false,
        tabBarActiveTintColor:"#40A578",
        tabBarStyle:{
          height: 88,
          alignContent: 'center',
          justifyContent: 'center',
          display: 'flex',
          borderTopColor: "black",
        }
        }}>
        
        <Tabs.Screen 
          name='home'
          options={{
            title:"Home",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
                <TabIcon
                  icon={icons.home}
                  color={color}
                  name={"Home"}
                  imgSize={" w-6 h-6"}
                  focused={focused}
                />
            )
          }}
        />

        <Tabs.Screen 
          name='item-shop'
          options={{
            title:"Home",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
                <TabIcon
                  icon={icons.grocery}
                  color={color}
                  name={"Cart"}
                  focused={focused}
                  imgSize={" w-7 h-7"}
                />
            )
          }}
        />

        <Tabs.Screen 
          name='Profile'
          options={{
            title:"Profile",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
                <TabIcon
                  icon={icons.profile}
                  color={color}
                  name={"Profile"}
                  focused={focused}
                  imgSize={" w-6 h-6"}
                />
            )
          }}
        />

      </Tabs>
    </>
  )
}

export default TabsLayout