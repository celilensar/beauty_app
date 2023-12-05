import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react'

import { FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const BottomTab = ({activeScreen}) => {
  
	const navigation= useNavigation();
	return (
	<View className="absolute bottom-6 w-full px-8 ">
	  <View className="bg-[#130d2d] rounded-xl px-4 py-6 w-full flex-row items-center justify-around">
		<TouchableOpacity>
			<FontAwesome name="user" size={24} color="#5c5470" />
		</TouchableOpacity>
		<TouchableOpacity>
			<FontAwesome name="list-ul" size={24} color="#5c5470" />
		</TouchableOpacity>
		<TouchableOpacity onPress={() => navigation.navigate("Home")}>
			<Entypo name="home" size={24} color={activeScreen === "Home" ? "#fff" : "#5c5470"} />
		</TouchableOpacity>
		<TouchableOpacity>
			<MaterialIcons name="favorite" size={24} color="#5c5470" />
		</TouchableOpacity>
		<TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
			<FontAwesome  name="opencart" size={24} color={activeScreen === "CartScreen" ? "#fff" : "#5c5470"}/>
		</TouchableOpacity>
	  </View>
	</View>
  )
}

export default BottomTab