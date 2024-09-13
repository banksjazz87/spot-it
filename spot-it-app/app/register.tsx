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
	const [validEmail, setValidEmail] = useState<boolean>(true);

	/**
	 *
	 * @param email string value that is passed in for the email
	 * @returns true if a valid email has been provided.
	 */
	const emailChecker = (email: string): boolean => {
        const emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const currentValue: string = email;

        return emailRegex.test(currentValue);
	};

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
					onChangeText={(text) => setNewUser({ ...newUser, email: text.trim() })}
					onEndEditing={(e): void => emailChecker(newUser.email) ? setValidEmail(true): setValidEmail(false)}
					autoCapitalize="none"
					style={[validEmail ? StyleClasses.textInput : StyleClasses.invalidInput]}
				/>
				<TextInput
					editable
					textContentType="username"
					inputMode="text"
					numberOfLines={1}
					maxLength={40}
					value={newUser.userName}
					onChangeText={(text) => setNewUser({ ...newUser, userName: text.trim() })}
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
					onChangeText={(text) => setNewUser({ ...newUser, password: text.trim() })}
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
                    onChangeText={(text) => setNewUser({ ...newUser, verifyPassword: text.trim() })}
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
