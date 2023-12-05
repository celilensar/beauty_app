import { View, Text, ActivityIndicator, SafeAreaView, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Entypo, AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { addToCart } from '../context/actions/cartActions';

const ProductScreen = ({route}) => {
	const {_id} = route.params;
	const feeds = useSelector(state => state.feeds)
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState(null)
	const navigation= useNavigation();
	const [qty, setQty] = useState(1)
	screenHeight = Math.round(Dimensions.get("window").height);
	const cartItems = useSelector((state) => state.cartItems);
	
	const dispatch= useDispatch();

	useEffect(()=>
	{
		setIsLoading(true)
		if(feeds){
			setData(feeds?.feeds.filter((item) => item._id === _id)[0])
			setInterval(() => {
				setIsLoading(false)
			}, 2000)
		}
	},[])
	
	const handleQty = (action) => {
		const newQty= qty + action;
		
		setQty(newQty>0 ? newQty : 1);

		
	}

	const handlePressCart = () => {
		dispatch(addToCart({ data : data, qty : qty }))
	}

	return (
	<View className="flex-1 items-start justify-start bg-[#EBEAEF] space-y-4">
	  {isLoading ? <View className=" w-full flex-1 h-full items-center justify-center">
	  <ActivityIndicator size={'large'} color={"teal"} />
	  </View> : 
	  <>
	  	<SafeAreaView className=" w-full">
			<View className="flex-row items-center justify-between px-4 py-2 w-full">
				<TouchableOpacity>
				<Entypo onPress={() => {navigation.goBack()}} name="chevron-left" size={30} color={"#555"} />
				</TouchableOpacity>
				<TouchableOpacity>
					<FontAwesome onPress={() => navigation.navigate("CartScreen")} name="opencart" size={25} color="#555" />
				</TouchableOpacity>
			</View>

			<View className="w-full h-full flex items-center justify-center top-10 relative" style={{height: screenHeight /2.5}}>
				<Image source={{uri : data?.bgImage?.asset?.url}} resizeMode='cover' className="w-full h-full opacity-30"/>
				<View className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
				<Image source={{uri : data?.mainImage?.asset?.url}} resizeMode='contain' className="w-80 h-80"
				/>

				</View>
			</View>

			<View className="w-full flex-row items-center justify-evenly mb-4">
				{data?.categories && data?.categories?.length > 0 && data?.categories.map((value) => (
					<View key={value._id} className="p-2 w-24 rounded-xl bg-white flex items-center justify-center space-y-2">
						<Image source={{uri : value?.mainImage?.asset?.url}} resizeMode='contain' className="w-10 h-10 opacity-70"/>

						<Text className="font-semibold text-[#555]">{value.title}</Text>
					</View>
				))}
			</View>
		</SafeAreaView>
		<View className="w-full flex-1 h-full bg-white rounded-t-[36px] py-6 px-12 space-y-4">
			<View className="w-full items-center justify-between flex-row">
				<View className="flex items-start justify-center">
					<Text className="text-xl font-semibold text-[#777]">
						{data?.shortDescription}
					</Text>

				</View>
				<TouchableOpacity className="bg-black w-8 h-8 rounded-full flex items-center justify-center">
					<AntDesign name="heart" size={16} color="#fbfbfb"/>
				</TouchableOpacity>
			</View>
			<View className="flex-row w-full items-center justify-between">
				<Text className="text-lg font-bold text-black">
				$	{data?.price}
				</Text>
				<View className="flex-row items-center justify-between space-x-4 rounded-xl border border-gray-200 px-4 py-1">
					<TouchableOpacity onPress={() => handleQty(-1)} >
						<Text className="text-xl font-bold text-[#555]">-</Text>
					</TouchableOpacity>

					<TouchableOpacity>
						<Text className="text-xl font-bold text-black">{qty}</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => handleQty(1)}>
						<Text className="text-xl font-bold text-[#555]">+</Text>
					</TouchableOpacity>
				</View>

				{cartItems?.cart?.filter((item) => item?.data?._id === data?._id)?.length > 0 ? (
					<TouchableOpacity className="bg-black px-4 py-2 rounded-xl">
						<Text className="text-base font-semibold text-gray-50">Added</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={handlePressCart} className="bg-black px-4 py-2 rounded-xl">
						<Text className="text-base font-semibold text-gray-50">Cart</Text>
					</TouchableOpacity>
				)}
				

			</View>

		</View>
		
	  </>
	  }
	</View>
	
  )
}

export default ProductScreen