import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import PrimaryButton from "../global/PrimaryButton";

interface UserLogin {
	email: string;
	password: string;
}

export default function Login() {
	const [loginUser, setLoginUser] = useState<UserLogin>({
		email: "Email",
		password: "Password",
	});

	const loginChangeHandler = (text: string, key: string): void => {
		setLoginUser({
			...loginUser,
			[key as keyof UserLogin]: text,
		});
	};

	return (
		<View style={styles.loginContainer}>
			<TextInput
				editable
				numberOfLines={1}
				maxLength={40}
				autoComplete={"email"}
				value={loginUser.email}
				style={styles.input}
				onChangeText={(text: string) => loginChangeHandler(text, "email")}
				autoCapitalize="none"
			/>
			<TextInput
				editable
				numberOfLines={1}
				maxLength={40}
				autoComplete={"password"}
				value={loginUser.password}
				style={styles.input}
				onChangeText={(text: string) => loginChangeHandler(text, "password")}
				autoCapitalize="none"
			/>

			<View style={{ display: "flex", flexDirection: "row", columnGap: 10 }}>
				<Pressable>
					<Text>Forgot your password?</Text>
				</Pressable>
				<Pressable>
					<Text>New Here</Text>
				</Pressable>
			</View>

			<PrimaryButton
				text="Log In"
				method={() => console.log("Clicked")}
				style={{ paddingTop: 10, paddingBottom: 10 }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	loginContainer: {
		display: "flex",
		flexDirection: "column",
		rowGap: 10,
		padding: 20,
		width: 400,
	},
	input: {
		padding: 5,
		borderColor: "black",
		borderWidth: 1,
		borderStyle: "solid",
		fontSize: 18,
		fontFamily: "Red Hat Display",
	},
});
