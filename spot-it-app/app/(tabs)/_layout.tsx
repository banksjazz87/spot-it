import { Tabs } from "expo-router";
import { useEffect, useState } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/lib/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import "expo-dev-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../constants/interfaces";
import UserClass from "../../constants/modules/UserClass";

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const [currentUser, setCurrentUser] = useState<User>({
		username: "",
		email: "",
		loggedIn: false,
	});
	const SystemUser = new UserClass();

	useEffect((): void => {
		SystemUser.get().then((data) => {
			if (data !== null) {
				setCurrentUser({
					...currentUser,
					username: data.username,
					email: data.email,
					loggedIn: true,
				});

				console.log("SYSTEM USER IS SET!!!! ", data.username);
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
					name="profile"
					options={{
						title: "Profile",
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								name={focused ? "person" : "person-outline"}
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
