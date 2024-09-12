import { View, Text, StyleSheet, TextInput, Pressable, GestureResponderEvent } from "react-native";
import { useState } from "react";
import { StyleClasses } from "@/constants/lib/StyleClasses";
import { router } from "expo-router";

interface NewUser {
	email: string;
	userName: string;
	password: string;
	verifyPassword: string;
}

export default function Register() {
	const [newUser, setNewUser] = useState<NewUser>({
		email: "Email",
		userName: "Username",
		password: "Password",
		verifyPassword: "Verify Password",
	});
	const [hidePassword, setHidePassword] = useState<boolean>(true);

	return (
		<View style={styles.wrapper}>
			<View style={styles.innerContainer}>
				<Text>Create an account</Text>
				<TextInput
					editable
					textContentType="emailAddress"
					inputMode="email"
					numberOfLines={1}
					maxLength={40}
					value={newUser.email}
					onChangeText={(text) => setNewUser({ ...newUser, email: text })}
					autoCapitalize="none"
					style={[StyleClasses.textInput]}
				/>
				<TextInput
					editable
					textContentType="username"
					inputMode="text"
					numberOfLines={1}
					maxLength={40}
					value={newUser.userName}
					onChangeText={(text) => setNewUser({ ...newUser, userName: text })}
					autoCapitalize="none"
					style={[StyleClasses.textInput]}
				/>
				<TextInput
					editable
					textContentType="password"
					inputMode="text"
					secureTextEntry={hidePassword}
					numberOfLines={1}
					maxLength={40}
					value={newUser.password}
					onChangeText={(text) => setNewUser({ ...newUser, password: text })}
					autoCapitalize="none"
					style={[StyleClasses.textInput]}
				/>
				<TextInput
					editable
					numberOfLines={1}
					textContentType="password"
					inputMode="text"
					secureTextEntry={hidePassword}
					maxLength={40}
					value={newUser.verifyPassword}
					onChangeText={(text) => setNewUser({ ...newUser, verifyPassword: text })}
					autoCapitalize="none"
					style={[StyleClasses.textInput]}
				/>
				<View>
					<Pressable onPress={(e: GestureResponderEvent): void => router.navigate("/")}>
						<Text>Return to Login</Text>
					</Pressable>

					<Pressable onPress={(e: GestureResponderEvent): void => setHidePassword(!hidePassword)}>
						<Text>{hidePassword ? "Show Password" : "Hide Password"}</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	innerContainer: {
		display: "flex",
		flexDirection: "column",
		rowGap: 10,
		padding: 20,
		width: 400,
	},
});
