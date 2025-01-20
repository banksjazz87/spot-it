import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert, GestureResponderEvent, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "@/components/global/PrimaryButton";
import { router, Stack } from "expo-router";
import { StyleClasses } from "@/constants/lib/StyleClasses";
import API from "@/constants/modules/ApiClass";
import { APIResponse, EmailData, SQLResponse, APIError, User } from "@/constants/interfaces";
import AppModal from "@/components/global/AppModal";
import LoadingModal from "@/components/global/LoadingModal";
import SystemUser from "@/constants/modules/SystemUserClass";

export default function ResetPassword(): JSX.Element {
	const [userEmail, setUserEmail] = useState<string>("Email");
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [modalText, setModalText] = useState<string>("This is a temporary message just to start styling so oh yeah cool beans.");
	const [validSubmission, setValidSubmission] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const emailChangeHandler = (text: string): void => {
		setUserEmail(text);
	};

	//Used to get the user details based on the provided email, this is fired in the submit handler.
	const getUserDetails = async (email: string): Promise<APIResponse<EmailData> | undefined> => {
		const Api = new API("/get-user-by-email/");
		const userDetailsURL = `${Api.getUrl()}/${email}`;

		try {
			const userDetails: Response = await fetch(userDetailsURL);
			const userJSON: APIResponse<EmailData> = await userDetails.json();
			return userJSON;
		} catch (e) {
			console.log("The following error occurred in getting the user details", e);
		}
	};

	const generateNewPassword = async (userObj: EmailData): Promise<APIResponse<SQLResponse[]> | undefined> => {
		const Api = new API("/set-random-password/", userObj);

		try {
			const requestNewPassword = (await Api.putData()) as APIResponse<SQLResponse[]>;
			return requestNewPassword;
		} catch (e: any) {
			console.log("The following error occurred while generating a new password ", e);
		}
	};

	const displayAppModalMessage = (message: string): void => {
		setIsModalVisible(true);
		setModalText(message);
	};

	const delayedFailureMessage = (message: string): void => {
		setTimeout((): void => {
			displayAppModalMessage(message);
			setValidSubmission(false);
		}, 500);
	};

	const SysUser = new SystemUser();

	const updateSysUser = (userObj: User): void => {
		SysUser.clear().then((): void => {
			SysUser.set(userObj);
		});
	};

	const clearSysUserWithMessage = (message: string): void => {
		SysUser.clear().then((): void => {
			delayedFailureMessage(message);
		});
	};

	const submitHandler = (): void => {
		setIsLoading(true);

		// Get the current user
		getUserDetails(userEmail)
			.then((data: undefined | APIResponse<EmailData>): void => {
				//Check the user's email data
				if (typeof data?.data !== "undefined" && data?.status === 200) {
					//User data
					const neededData = data.data as EmailData;

					//Create new password
					generateNewPassword(neededData)
						.then((final: APIResponse<SQLResponse[]> | undefined): void => {
							//Verify that the new password has been sent
							if (typeof final !== "undefined" && final.status === 200) {
								const currentUser = {
									username: "",
									email: userEmail,
									loggedIn: false,
									passwordReset: true,
								};

								updateSysUser(currentUser);
								SysUser.get().then((obj: User | null): void => console.log(obj));
								displayAppModalMessage("Your password has been reset! Check your email for the new password and click okay below to log in. Didn’t see the email? Check your spam folder. Need help? Contact support.");
								setValidSubmission(true);

								//Failed in reaching out to the API
							} else if (typeof final === "undefined") {
								displayAppModalMessage("Unable to create a new password");
								return final;
								//Returned no results
							} else {
								displayAppModalMessage(`The following error occurred in sending the reset email to ${neededData.email}, ${final.message}`);

								console.log(`The following error occurred in sending the reset email to ${neededData.email}, ${final.message}.`);
							}
						})
						.catch((error: APIError): void => {
							displayAppModalMessage(error.message);
							console.log(error.message);
						})
						.finally((): void => {
							setIsLoading(false);
						});

					//No record found for the provided email
				} else if (typeof data?.data === "undefined" && data?.status === 200) {
					setIsLoading(false);
					clearSysUserWithMessage("The entered email doesn't exist in the database.");
				} else {
					setIsLoading(false);
					clearSysUserWithMessage(`The following error occurred in retrieving the user with the provided email, ${data?.message}`);
				}
			})
			.catch((error: APIError): void => {
				setIsLoading(false);
				clearSysUserWithMessage(`The following error occurred in retrieving the user with the provided email, ${error?.message}`);
			});
	};

	return (
		<SafeAreaView style={[StyleClasses.loginContainer, { justifyContent: "center", flex: 1 }]}>
			{isLoading && (
				<LoadingModal
					isLoading={isLoading}
					visibleHandler={(): void => setIsLoading(!isLoading)}
				/>
			)}
			{isModalVisible && validSubmission && (
				<AppModal
					modalVisible={isModalVisible}
					visibleHandler={(): void => setIsModalVisible(!isModalVisible)}
					message={modalText}
					acceptText={"Okay"}
					acceptHandler={(): void => router.navigate("/")}
					closeHandler={(): void => setIsModalVisible(false)}
					rejectText="Cancel"
					rejectHandler={(): void => setIsModalVisible(false)}
				/>
			)}

			{isModalVisible && !validSubmission && (
				<AppModal
					modalVisible={isModalVisible}
					visibleHandler={(): void => setIsModalVisible(!isModalVisible)}
					message={modalText}
					acceptText={"Okay"}
					acceptHandler={(): void => setIsModalVisible(false)}
					closeHandler={(): void => setIsModalVisible(false)}
				/>
			)}

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
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
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
