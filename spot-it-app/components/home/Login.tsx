import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import PrimaryButton from "../global/PrimaryButton";
import API from "../../constants/modules/ApiClass";
import { UserLogin, UserId, ApiMessage, LoginResponse, ApiErrorResponse, LoginProps } from "../../constants/interfaces";
import UserClass from "../../constants/modules/UserClass";

export default function Login({ loginUpdater }: LoginProps) {
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

	const getUser = async (): Promise<any> => {
		const api = new API("/get-valid-user/");
		const url = api.getUrl();
		const fullUrl = `${url}/${loginUser.email}/${loginUser.password}`;

		try {
			const getUser = await fetch(fullUrl);
			const userJSON = getUser.json();

			return userJSON;
		} catch (e: unknown) {
			console.log(e);
		}
	};

	const login = async (obj: UserId): Promise<any> => {
        const api = new API("/login-user/", obj);
        
        console.log("URLLLLL ", api.getUrl());

		try {
            const loginUser = await api.putData();
            return loginUser;
		} catch (e: any) {
			console.log(e);
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

	const submitHandler = (): void => {
        getUser()
			.then((data: LoginResponse): void => {
				//Check that we actually got a valid user
				if (data.data.length > 0) {
					
					//create object to pass back to login
					const currentUserId: UserId = {
						id: data.data[0].id,
						username: data.data[0].username,
                    };

                    console.log("USERRRR HERE ", currentUserId);
                    
					//Login the user
					login(currentUserId)
						.then((data: LoginResponse): void => {
							if (data.status === 200) {
								loginUpdater(currentUserId.username, loginUser.email);

								// const CurrentUser = new UserClass();
								// const userData = {
								// 	username: data.data[0].username,
								// 	email: data.data[0].email,
								// 	loggedIn: data.data[0].loggedIn === 1 ? true : false,
								// };

								// CurrentUser.setSystemUser(userData)
								// 	.then((data) => {
								// 		CurrentUser.getSystemUser()
								// 			.then((final) => console.log(final))
								// 			.catch((err) => console.log("Error getting the system user ", err));
								// 	})
								// 	.catch((err) => console.log("Error in setting the current User ", err));
							} else {
								throwInvalidUserAlert();
							}
						})
						.catch((err: ApiErrorResponse): void => {
							console.log("FAILURE logging in ", err);
							throwServerError(err.message);
						});
				} else {
					throwInvalidUserAlert();
				}
			})
			.catch((err: ApiErrorResponse): void => {
				console.log("Error logging in ", err);
				throwServerError(err.message);
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
					<Text style={styles.rHFont}>Forgot your password?</Text>
				</Pressable>
				<Pressable>
					<Text style={styles.rHFont}>New Here</Text>
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
	input: {
		padding: 5,
		borderColor: "black",
		borderWidth: 1,
		borderStyle: "solid",
		fontSize: 18,
		fontFamily: "Red Hat Display",
	},
	rHFont: {
		fontFamily: "Red Hat Display",
	},
});
