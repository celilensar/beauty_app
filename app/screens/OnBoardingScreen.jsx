import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import Swiper from "react-native-swiper"
import { Screen1, Screen2, Screen3 } from '../assets'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
const OnBoardingScreen = () => {

	const navigation= useNavigation();
	useEffect(()=> {
		const checkOnBoardingStatus = async () =>{
			const value= await AsyncStorage.getItem("@onboarding_complete");
			if ( value !== null && value === "false") {
				navigation.replace("Home");
			}
		}
		
		checkOnBoardingStatus();
	}, [])
	
	const handleOnBoardingComplete= async (e) => {
		console.log('triggered: ', e);
		if(e === 2) {
			try {	
				await AsyncStorage.setItem("@onboarding_complete", "true");
				navigation.navigate("Home");
				
			} catch (error) {
				console.log("Error on storing status")
			}
		}
	}
  return (
	<View  className="flex-1 items-center justify-center bg-white">
	  <Swiper onIndexChanged={handleOnBoardingComplete}>
		<ScreenOne/>
		<ScreenTwo/>
		<ScreenThree/>
	  </Swiper>
	</View>
  )
}
export const ScreenOne = () => {
	return (
		<View className="flex-1 items-center justify-center relative">
			<Image source={Screen1} className="w-full h-full" resizeMode="cover" />
			<View className="w-auto  h-auto flex items-center justify-center absolute p-2 top-20 left-5 ">
				<Text className="font-bold w-42s text-5xl opacity-70 text-white"><Text className="text-black opacity-50">O </Text>Senin Güzelliğin!</Text>
			</View>
		</View>
	)
}
export const ScreenTwo = () => {
	return (
		<View className="flex-1 items-center">
			<Image source={Screen2} className="w-full h-[65%]" resizeMode="cover" />
			<View className="items-center space-y-6 top-10">
				<Text className="font-bold text-2xl text-gray-600">
					Kendi Güzellik Ürünlerini Bul!
				</Text>
				<Text className="font-semibold text-s text-gray-600">
					Güzellik, karar verdiğin anda başlar..
				</Text>
			</View>
			<View></View>
		</View>
	)
}
export const ScreenThree = () => {
	return (
		<View className="flex-1 items-center">
			<Image source={Screen3} className="w-full h-[65%]" resizeMode="cover" />
			<View className="items-center justify-center space-y-6 top-10">
				<Text className="font-bold text-2xl text-gray-600 text-center">
				Güzel Olmak Sadece Dokunuş Uzaklıkta!
				</Text>
				<Text className="font-semibold text-s text-gray-600 text-center ">
					Güzelliğinizi İlerletin: Daha İyi Bir Sürümünüz İçin Yolculuğa Başlayın...
				</Text>
			</View>
			<View></View>
		</View>
	)
}


export default OnBoardingScreen