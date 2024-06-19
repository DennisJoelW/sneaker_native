import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import icons from '../../constants/icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { useLocalSearchParams, useRouter , useParams, router} from 'expo-router';
import { addSneakerToCart, formatNumberWithCommas, isItemInCart } from '../../lib/appwrite';
import  CustomButton  from "../../components/CustomButton";
import { useGlobalContext } from '../../context/GlobalProvider';

const SneakerDetail = () => {

  const router = useRouter();
  const { id, sneakers } = useLocalSearchParams();

  const [sizePicked, setSizePicked] = useState("")

  const { user, setUser, setIsLoggedIn} =  useGlobalContext()

  const sneakerData = sneakers ? JSON.parse(sneakers) : {};

  const [star, setStar] = useState(false);
  const [itemAdded, setItemAdded] = useState();

  useEffect(() => {
    const checkCart = async () => {
      const cart = await isItemInCart(sneakerData.$id, user.accountId);
      setItemAdded(cart);
    };
    checkCart();
  }, [sneakerData.$id, user.accountId]);


  const NavbarCom = ({leftIcon, rightIcon, title, titleStyle, leftIconPress, rightIconPress, rightIconStyle, leftIconStyle}) => {
    return(
      <View className=' w-[100%] pt-4 flex-row items-center justify-between mb-4'>

        <TouchableOpacity
         onPress={leftIconPress}

        >
            <Image
            source={leftIcon}
            className={` w-8 h-8 ml-1 ${leftIconStyle}`}
            tintColor={"black"}
            resizeMode='contain'
            />
        </TouchableOpacity>


      <Text className={`text-2xl font-psemibold pt-1 text-[#40A578] ${titleStyle} `}>{title}</Text>

      <TouchableOpacity
        onPress={rightIconPress}
      >

        <Image
            source={rightIcon ? rightIcon : icons.shopcart}
            className={` w-8 h-8 mr-1 ${rightIconStyle}`}
            resizeMode='contain'
            tintColor={'black'}
        />

    </TouchableOpacity>
      

    </View>
    )
  }

  const pickSize = (size) => {
    setSizePicked(size)
  }

  const Size = ({size}) => {

    const theSize = sizePicked === size

    return (
      <TouchableOpacity
        onPress={() => pickSize(size)}
      >
        <View className = {` w-[33px] h-[33px] border-[1.5px] border-primary items-center justify-center ml-[10px] rounded-lg ${theSize ?" bg-primary text-white " : ""}`}>
          <Text className = {`  font-pregular ${theSize?"text-white":""}`}>{size}</Text>
      </View>
      </TouchableOpacity>
    )
  }


  return (
    <SafeAreaView className=' flex-1'>
      <ScrollView className=' px-4'
        showsVerticalScrollIndicator={false}
      >

    <NavbarCom
      title={""}
      leftIcon={icons.back}
      leftIconStyle={' w-[26px] h-[26px]'}
      rightIconStyle={' w-[26px] h-[26px]'}
    />

    <View className='w-full items-center justify-center mb-[50px]'>
      <Image 
        source={{uri: sneakerData.sneakersImage}}
        style={{width:320, height:320, 
          transform: [
            { rotate: '-30deg' }, // Tilt
            { scaleX: -1 },       // Mirror
          ]
        }}
        className=' mt-[-70px] ml-[-75px]'
        resizeMode='contain'
        
      />
    </View>

    <View className='w-full justify-between flex-row'>
        <Text className=' max-w-[55%] font-psemibold text-[16px] '>{sneakerData.sneakersName}</Text>
        <Text className=' max-w-[45%] font-pmedium text-primary '>IDR {formatNumberWithCommas(sneakerData.sneakersPrice)}</Text>
    </View>

    <View>
      <Text className=' text-gray-500 font-pregular mb-4'>Brand : {sneakerData.brand}</Text>
      <Text className=' font-psemibold text-[16px] '>Description</Text>
      <Text className=' font-pregular text-[12px] text-justify text-gray-500 mb-3'>Step into style and comfort with our latest collection of sneakers. Designed to keep you on your feet all day, our sneakers blend cutting-edge technology with contemporary fashion, or hanging out with friends, these sneakers are your go-to for unparalleled support and style.</Text>
    </View>

    <View className='items-end mb-8 flex-1 w-full'>
          <Text className='font-psemibold text-[16px] mb-1'>Size</Text>
          <View className='items-end h-fit w-[50%]'>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className='w-full'>
                <Size size={"39"} />
                <Size size={"40"} />
                <Size size={"41"} />
                <Size size={"42"} />
                <Size size={"43"} />
                <Size size={"44"} />
            </ScrollView>
          </View>
    </View>

    <View className=' flex-row justify-between items-center w-full h-fit mb-10'>

      <CustomButton
          title={itemAdded ? "Delete from cart" : "Add to cart"}
          containerStyles={itemAdded ? "mx-0 mt-1 h-[50px] w-[78%] bg-[#A91D3A]" :" mx-0 mt-1 h-[50px] w-[78%]"}
          textStyles={" font-pregular text-[16px]"}
          handlePress={() => addSneakerToCart(sneakerData.$id, user.accountId )}
      />  


      <View className=' w-[22%] items-center justify-center '>
        <TouchableOpacity
          onPress={() => setStar(!star)}
          activeOpacity={0.8}
        >
          <Image
            source={star ? icons.favorite_filled : icons.favorite}
            style={{width:35, height:35}}
          />
        </TouchableOpacity>
      </View>

    </View>
    
      </ScrollView>
    </SafeAreaView>
  )
}

export default SneakerDetail