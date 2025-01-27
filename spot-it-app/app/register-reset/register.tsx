import { View, Text, StyleSheet, TextInput, Pressable, GestureResponderEvent, Modal } from "react-native";
import { useState } from "react";
import { StyleClasses } from "@/constants/lib/StyleClasses";
import { router } from "expo-router";
import PrimaryButton from "@/components/global/PrimaryButton";
import { NewUserInterface } from "@/constants/interfaces";
import NewUserClass from "@/constants/modules/NewUserClass";
import { ApiDataResponse } from "@/constants/interfaces";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Register() {
	const [newUser, setNewUser] = useState<NewUserInterface>({
		email: "Email",
		username: "Username",
		password: "Password",
		verifyPassword: "Verify Password",
	});
	const [hidePassword, setHidePassword] = useState<boolean>(false);
	const [validEmail, setValidEmail] = useState<boolean>(true);
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const NewUser = new NewUserClass(newUser);

	const registerHandler = (): void => {
		if (NewUser.isValid()) {
			NewUser.createUser()
				.then((data: ApiDataResponse | string) => {
					if (typeof data !== "string") {
						router.navigate("/");
					} else {
						console.log(data);
					}
				})
				.catch((err) => console.log(err));
		} else {
			console.log("Invalid registration");
			setModalVisible(true);
		}
	};

	//Using this method to clear the clicked in field if the current value is equal to the default value, also used to hide the password input.
	const clearFieldIfDefault = (fieldKey: string, value: string, password: boolean): void => {
		const key = fieldKey as keyof NewUserInterface;
		if (password && newUser[key] === value) {
			setNewUser({ ...newUser, [key]: "" });
			setHidePassword(true);
		} else if (!password && newUser[key] === value) {
			setNewUser({ ...newUser, [key]: "" });
		}
	};

	return (
		<View style={styles.wrapper}>
			<View style={styles.innerContainer}>
				<View style={styles.modalContainer}>
					<Modal
						animationType="slide"
						transparent={true}
						visible={modalVisible}
						onRequestClose={(): void => {
							setModalVisible(!modalVisible);
						}}
					>
						<View style={styles.modalContainer}>
							<Text>Oh no, it looks like you still need to provide some information in your form.</Text>
							<Pressable
								onPress={(): void => setModalVisible(!modalVisible)}
							>
								<Text>Okay</Text>
							</Pressable>
						</View>
					</Modal>
				</View>


				<Text>Create an account</Text>
				<TextInput
					editable
					textContentType="emailAddress"
					inputMode="email"
					numberOfLines={1}
					maxLength={40}
					value={newUser.email}
					onChangeText={(text) => setNewUser({ ...newUser, email: text.trim() })}
					onEndEditing={(e): void => (NewUser.validEmail() ? setValidEmail(true) : setValidEmail(false))}
					autoCapitalize="none"
					style={[validEmail ? StyleClasses.textInput : StyleClasses.invalidInput]}
					onPressIn={() => clearFieldIfDefault("email", "Email", false)}
				/>
				<TextInput
					editable
					textContentType="username"
					inputMode="text"
					numberOfLines={1}
					maxLength={40}
					value={newUser.username}
					onChangeText={(text) => setNewUser({ ...newUser, username: text.trim() })}
					autoCapitalize="none"
					style={[StyleClasses.textInput]}
					onPressIn={() => clearFieldIfDefault("username", "Username", false)}
				/>
				<TextInput
					editable
					// textContentType="password"
					inputMode="text"
					secureTextEntry={hidePassword}
					numberOfLines={1}
					maxLength={40}
					value={newUser.password}
					onChangeText={(text) => setNewUser({ ...newUser, password: text.trim() })}
					autoCapitalize="none"
					style={[StyleClasses.textInput]}
					onPressIn={(): void => clearFieldIfDefault("password", "Password", true)}
				/>
				<TextInput
					editable
					numberOfLines={1}
					// textContentType="password"
					inputMode="text"
					secureTextEntry={hidePassword}
					maxLength={40}
					value={newUser.verifyPassword}
					onChangeText={(text) => setNewUser({ ...newUser, verifyPassword: text.trim() })}
					autoCapitalize="none"
					style={[StyleClasses.textInput]}
					onPressIn={(): void => clearFieldIfDefault("verifyPassword", "Verify Password", true)}
				/>
				<View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", marginTop: 10, paddingHorizontal: 5 }}>
					<Pressable onPress={(e: GestureResponderEvent): void => router.navigate("/")}>
						<Text>Return to Login</Text>
					</Pressable>

					<Pressable onPress={(e: GestureResponderEvent): void => setHidePassword(!hidePassword)}>
						<Ionicons
							name={hidePassword ? "eye-off-outline" : "eye-outline"}
							size={24}
							color="black"
						/>
					</Pressable>
				</View>

				<PrimaryButton
					text="Register"
					method={(): void => registerHandler()}
					style={{ paddingTop: 10, paddingBottom: 10 }}
				/>
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
		rowGap: 15,
		padding: 20,
		width: 400,
	},
	modalContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, .8)",
	},
});
