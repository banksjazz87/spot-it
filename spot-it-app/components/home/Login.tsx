import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert, GestureResponderEvent } from "react-native";
import PrimaryButton from "../global/PrimaryButton";
import API from "../../constants/modules/ApiClass";
import { UserLogin, UserId, APIResponse, FullUser, ApiErrorResponse, LoginProps } from "../../constants/interfaces";
import SystemUser from "../../constants/modules/SystemUserClass";
import { router } from "expo-router";
import { StyleClasses } from "../../constants/lib/StyleClasses";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Login({ loginUpdater, user, targetUrl }: LoginProps) {
	const [loginUser, setLoginUser] = useState<UserLogin>({
		email: "Email",
		password: "Password",
	});
	const [hidePassword, setHidePassword] = useState<boolean>(false);

	const loginChangeHandler = (text: string, key: string): void => {
		setLoginUser({
			...loginUser,
			[key as keyof UserLogin]: text.trim(),
		});
	};

	const getUser = async (): Promise<any> => {
		const api = new API("/get-valid-user/");
		const url = api.getUrl();
		const fullUrl = `${url}/${loginUser.email}/${loginUser.password}`;

		try {
			const getUser = await fetch(fullUrl);
			const userJSON = getUser.json();

			return userJSON;
		} catch (e: unknown) {
            return e;
		}
	};

	const login = async (obj: UserId): Promise<any> => {
        const api = new API("/login-user/", obj);
        
		try {
			const loginUser = await api.putData();
			return loginUser;
		} catch (e: any) {
            return e;
		}
	};

	const throwInvalidUserAlert = (): void => {
		Alert.alert("Invalid", "Invalid user credentials have been provided", [
			{
				text: "Try Again",
				onPress: (): void => console.log("Retry Password"),
			},
			{
				text: "Sign Up",
				onPress: (): void => console.log("new user"),
			},
		]);
	};

	const throwServerError = (message: string): void => {
		Alert.alert("Server Error", message, [
			{
				text: "Okay",
				onPress: (): void => console.log("Server Error exited"),
			},
		]);
	};

	const updateSystemUser = (obj: UserId): void => {
		const CurrentUser = new SystemUser();
		const userData = {
			username: obj.username,
			email: obj.email,
			loggedIn: obj.loggedIn,
		};

		CurrentUser.set(userData)
			.then((data) => {
				CurrentUser.get()
					.then((final) => console.log("Final Credentials ", final))
					.catch((err) => console.log("Error getting the system user ", err));
			})
			.catch((err) => console.log("Error in setting the current User ", err));
	};

	const submitHandler = (): void => {
		getUser()
			.then((data: APIResponse<FullUser>): void => {
				console.log('Data here ', data);
				//Check that we actually got a valid user
				if (data.status === 200 && data.data) {
					//create object to pass back to login
					const currentUserId: UserId = {
						id: data.data.id,
						username: data.data.username,
						email: data.data?.email,
						loggedIn: 1 ? true : false,
					};

					//Login the user
					login(currentUserId)
						.then((data: APIResponse<FullUser>): void => {
							if (data.status === 200) {
								loginUpdater(currentUserId.username, loginUser.email);
                                updateSystemUser(currentUserId);
                                router.navigate(targetUrl);
							} else {
								throwInvalidUserAlert();
							}
						})
						.catch((err: ApiErrorResponse): void => {
							throwServerError(err.message);
						});
				} else {
					throwInvalidUserAlert();
				}
			})
			.catch((err: ApiErrorResponse): void => {
				throwServerError(err.message);
			});
	};

	return (
		<View style={StyleClasses.loginContainer}>
			<TextInput
				editable
				numberOfLines={1}
				maxLength={40}
				autoComplete={"email"}
				value={loginUser.email}
				style={StyleClasses.textInput}
				onChangeText={(text: string): void => loginChangeHandler(text, "email")}
				onPressIn={(): void => setLoginUser({...loginUser, email: ''})}
				autoCapitalize="none"
			/>
			<TextInput
				editable
				numberOfLines={1}
				maxLength={40}
				autoComplete={"password"}
				secureTextEntry={hidePassword}
				value={loginUser.password}
				style={StyleClasses.textInput}
				onChangeText={(text: string): void => loginChangeHandler(text, "password")}
				autoCapitalize="none"
				onPressIn={(): void => {
					if (loginUser.password === "Password") {
						setHidePassword(true);
						setLoginUser({ ...loginUser, password: "" });
					}
				}}
			/>

			<View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'space-between', paddingHorizontal: 5 }}>
				<View style={{ display: 'flex', flexDirection: 'row', columnGap: 10}}>
					<Pressable
						onPress={(e: GestureResponderEvent): void => {
							router.navigate('/register-reset/reset-password');
						}}
					>
						<Text style={styles.rHFont}>Forgot your password?</Text>
					</Pressable>
					<Pressable
						onPress={(e: GestureResponderEvent): void => {
							router.navigate("/register-reset/register");
						}}
					>
						<Text style={styles.rHFont}>New Here</Text>
					</Pressable>
				</View>
				<Pressable
					onPress={(e: GestureResponderEvent): void => {
						setHidePassword(!hidePassword);
					}}
				>
					<Ionicons
						name={!hidePassword ? "eye-off-outline" : "eye-outline"}
						size={24}
						color="black"
					/>
				</Pressable>
			</View>

			<PrimaryButton
				text="Log In"
				method={() => {
					submitHandler();
				}}
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
	rHFont: {
		fontFamily: "Red Hat Display",
	},
});
