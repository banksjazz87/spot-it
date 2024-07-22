import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import "expo-dev-client";

export default function TabLayout() {
	const colorScheme = useColorScheme();

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
}
