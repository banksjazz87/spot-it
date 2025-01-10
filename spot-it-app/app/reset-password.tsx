import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert, GestureResponderEvent } from "react-native";
import PrimaryButton from "@/components/global/PrimaryButton";
import { router, Stack } from "expo-router";
import { StyleClasses } from "@/constants/lib/StyleClasses";
import API from "@/constants/modules/ApiClass";

export default function ResetPassword(): JSX.Element {
	const [userEmail, setUserEmail] = useState<string>("Email");

	const emailChangeHandler = (text: string): void => {
		setUserEmail(text);
	};

	const submitHandler = (): void => {
		// const Api = new API('/set-random'
	};

	return (
			<View style={[StyleClasses.loginContainer, { justifyContent: "center", flex: 1 }]}>
				<Text style={[StyleClasses.headingOne, { textAlign: "left", textTransform: "uppercase", fontWeight: 700 }]}>Request New Password</Text>
				<TextInput
					editable
					numberOfLines={1}
					maxLength={40}
					autoComplete={"email"}
					value={userEmail}
					style={StyleClasses.textInput}
					onChangeText={(text: string): void => emailChangeHandler(text)}
					onPressIn={(): void => setUserEmail("")}
					autoCapitalize="none"
				/>

				<View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", columnGap: 10 }}>
					<Pressable
						onPress={(e: GestureResponderEvent): void => {
							router.navigate("/");
						}}
					>
						<Text>Back to Login</Text>
					</Pressable>

					<Pressable
						onPress={(e: GestureResponderEvent): void => {
							router.navigate("/register");
						}}
					>
						<Text>Create New Account</Text>
					</Pressable>
				</View>

				<PrimaryButton
					text="Submit"
					method={() => {
						submitHandler();
					}}
					style={{ paddingTop: 10, paddingBottom: 10 }}
				/>
			</View>
	);
}
