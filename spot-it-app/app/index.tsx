import { Pressable, Text, View, StyleSheet, GestureResponderEvent } from "react-native";
import { useState, useEffect } from "react";
import { ImageProperties } from "@/constants/interfaces";
import CharacterImages from "@/constants/lib/CharacterImages";
import LayoutConstructor from "@/constants/modules/layoutConstructorClass";
import { Card } from "../components/game/Card";
import SystemUser from "../constants/modules/SystemUserClass";
import Login from "../components/home/Login";
import { User } from "../constants/interfaces";
import { StyleClasses } from "../constants/lib/StyleClasses";

export default function Index() {
	const [currentUser, setCurrentUser] = useState<User>({
		username: "",
		email: "",
		loggedIn: false,
	});

	const SysUser = new SystemUser();

	useEffect((): void => {
		SysUser.get().then((data) => {
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

	//This is being used to update the current user, once the user's credentials have been verified in from the login.
	const updateUser = (name: string, userEmail: string): void => {
		setCurrentUser({
			...currentUser,
			username: name,
			email: userEmail,
			loggedIn: true,
		});
	};

	if (currentUser.loggedIn) {
		return (
			<View style={styles.container}>
				<Text style={StyleClasses.largeText}>Welcome {currentUser.username}</Text>
				<Pressable
					onPress={(event: GestureResponderEvent): void => {
						setCurrentUser({ ...currentUser, username: "", loggedIn: false, email: "" });

						SysUser.clear().then(() => console.log("USER CLEARED!"));
					}}
				>
					<Text>Reset</Text>
				</Pressable>
			</View>
		);
	} else {
		return (
			<View style={styles.container}>
				<Login
					loginUpdater={updateUser}
					user={currentUser}
					targetUrl={"/info"}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		rowGap: 40,
	},
});
