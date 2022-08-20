import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() =>{
    setTimeout(()=>{
      navigation.navigate("Delivery");
    }, 4000)
  }, [])

  return (
    <SafeAreaView className="bg-[#9acbc4] flex-1 justify-center items-center">
        <Animatable.Image
          source={require("../assets/orderLoading.gif")}
          animation="slideInUp"
          iterationCount={1}
          className="w-25 h-60"
        />

        <Animatable.Text
          animation="slideInUp"
          iterationCount={1}
          className="text-lg my-10 text-black font-extrabold text-center px-10">
          Waiting for restaurant to accept your order!
        </Animatable.Text>

        <Progress.Circle size={60} indeterminate={true} color="black"/>
    </SafeAreaView>
  )
}

export default PreparingOrderScreen