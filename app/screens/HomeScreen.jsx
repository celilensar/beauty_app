import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { Screen3 } from '../assets';
import { fetchFeeds } from '../sanity';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FEEDS } from '../context/actions/feedsActions';
import Feeds from '../components/Feeds';
import LottieView from "lottie-react-native";


const HomeScreen = () => {
	
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [filtered,setFiltered] = useState(null)
	const feeds = useSelector(state => state.feeds)
	const dispatch =useDispatch();


	const handleSearchTerm = (text) => {
		setSearchTerm(text);
		setFiltered(feeds?.feeds.filter((item) => item.title.includes(text)))
	}

	useEffect(() => {
		setIsLoading(true);
		try {
			fetchFeeds().then(res => {
				// console.log(res);
				dispatch(SET_FEEDS(res))
				console.log("Feeds from store: ", feeds?.feeds)
				setInterval(() => {
					setIsLoading(false)
				}, 2000);
			})
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	}, [])
  return (
	<SafeAreaView className="flex-1 items-center justify-start Bbg-[#EBEAEF]">
	  <View className="w-full flex-row justify-between items-center px-4 my-2">
	  	<MaterialCommunityIcons name="chevron-left" size={32} color="#555" />
		<Image source={Screen3} className="w-12 h-12 rounded-xl" resizeMode="cover"/>
	  </View>

		<View className="flex-row justify-between items-center px-4 py-2 w-full space-x-6">
			<View className="px-4 py-2 bg-white rounded-xl flex-1 flex-row items-center justify-center space-x-2">
				<Feather name="search" size={24} color="#7f7f7f" />
				<TextInput className="text-base font-semibold text=[#555] flex-1 py-1 -mt-1" placeholder='Ne arıyorsun?'
				value={searchTerm}
				onChangeText={handleSearchTerm}
				/>
			</View>
			<TouchableOpacity className="bg-white w-12 h-12 rounded-xl flex items-center justify-center">
				<FontAwesome name="filter" size={24} color="black" />
			</TouchableOpacity>
		</View>

		<ScrollView className="flex-1 w-full h-full">
		{isLoading ? ( <View className="flex-1 h-80 items-center justify-center">
			<ActivityIndicator size={'large'} color={"teal"} /></View>) : ( 
			<>
			<Feeds feeds= {filtered || filtered?.length > 0 ? filtered : feeds?.feeds}/>
			</>) }
		</ScrollView>

	</SafeAreaView>
  )
}

export default HomeScreen