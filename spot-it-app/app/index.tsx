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
import Logout from "@/components/global/Logout";
import PrimaryButton from "@/components/global/PrimaryButton";
import { router } from "expo-router";

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


	//Used to clear out the current user from the state.
	const clearCurrentUser = (): void => {
		setCurrentUser({
			...currentUser,
			username: '',
			email: '',
			loggedIn: false
		});
	}

	if (currentUser.loggedIn) {
		return (
			<View style={styles.container}>
				<Text style={StyleClasses.largeText}>Welcome {currentUser.username}</Text>
				<View style={StyleClasses.buttonGroup}>
					<PrimaryButton
						text={`Continue as ${currentUser.username}`}
						method={(): void => {
							router.navigate("/info");
						}}
						style={{ paddingTop: 10, paddingBottom: 10 }}
					/>
						<Logout logoutMethod={clearCurrentUser} />
				</View>
			</View>
		);
	} else {
		return (
			<View style={styles.container}>
				<Login
					loginUpdater={updateUser}
					user={currentUser}
					targetUrl={"/profile"}
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
		rowGap: 20,
	},
	
});
