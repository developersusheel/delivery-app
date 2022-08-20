import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  AdjustmentsIcon,
} from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const[featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown:false
    });
  }, []);

  useEffect(()=>{
    sanityClient.fetch(`
    *[_type=="featured"]{
      ...,
      restaurant[]->{
        ...,
        dishes[]->
      },
    }`).then(data=>{
      setFeaturedCategories(data);
    })
  }, [])

  // console.log(featuredCategories);

  return (
    <SafeAreaView className="bg-white pt-5">
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-0">
        <Image source={{uri: 'https://lh3.googleusercontent.com/ogw/AOh-ky0jz0grI41fZ0s9pNC_G6JWL3HIzwmX4Ge6TVuorA=s64-c-mo'}} className="h-7 w-7 bg-gray-300 p-4 rounded-full"/>
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl pr-1">Current Location<ChevronDownIcon size={20} color="#00CCBB"/></Text>
        </View>
        <UserIcon size={25} color="#00CCBB"/>
      </View>

      <View className="flex-row items-center space-x-2 pb-4 mx-4 px-0">
        <View className="flex-row space-x-2 flex-1 bg-gray-200">
          <SearchIcon color="gray" size={20}/>
          <TextInput placeholder='Restaurants & Cuisine' keyboardType='default' className="h-10"/>
        </View>
        <AdjustmentsIcon color="#00CCBB"/>
      </View>

      <ScrollView className="bg-gray-100 flex-1"  contentContainerStyle={{paddingBottom:100}}>
        {/* Categories */}
        <Categories/>
        {/* Featured */}

        {featuredCategories?.map(category =>(
          <FeaturedRow
          key={category._id}
          id={category._id}
          title={category.name}
          description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen