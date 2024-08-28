import { Tabs } from "expo-router";
import {useEffect, useState} from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/lib/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import "expo-dev-client";
import AsyncStorage from '@react-native-async-storage/async-storage';


interface User {
	username: string;
	email: string;
	loggedIn: boolean;
}

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const [currentUser, setCurrentUser] = useState<User>({
		username: '',
		email: '',
		loggedIn: false
	});
	
	
	const getUserInfo = async (): Promise<User | null> => {
		try {
			const jsonValue = await AsyncStorage.getItem('userInfo');

			if (jsonValue) {
				const parsed: User = JSON.parse(jsonValue);
				
				return parsed;

			} else {
				return null;
			}
		} catch (e) {

			console.log('Error in getting async storage ', e);
			return null;
		}
	}

	useEffect((): void => {
		getUserInfo()
			.then((data) => {
				if (data !== null) {
					setCurrentUser({
						...currentUser,
						username: data.username,
						email: data.email,
						loggedIn: true,
					});
				}
			});
	}, []);

	if (currentUser.loggedIn) {
		return (
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
					headerShown: false,
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Home",
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								name={focused ? "home" : "home-outline"}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="game"
					options={{
						title: "Game",
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								name={focused ? "game-controller" : "game-controller-outline"}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="info"
					options={{
						title: "Info",
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								name={focused ? "information-circle" : "information-circle-outline"}
								color={color}
							/>
						),
					}}
				/>
			</Tabs>
		);
	} else {
		return (
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
					headerShown: false,
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Home",
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								name={focused ? "home" : "home-outline"}
								color={color}
							/>
						),
						href: null,
					}}
				/>
				<Tabs.Screen
					name="game"
					options={{
						title: "Game",
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								name={focused ? "game-controller" : "game-controller-outline"}
								color={color}
							/>
						),
						href: null,
					}}
				/>
				<Tabs.Screen
					name="info"
					options={{
						title: "Info",
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								name={focused ? "information-circle" : "information-circle-outline"}
								color={color}
							/>
						),
						href: null,
					}}
				/>
			</Tabs>
		);
	}
}
